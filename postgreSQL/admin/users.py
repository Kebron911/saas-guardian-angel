from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from postgreSQL.database import DatabaseInterface
from postgreSQL.helpers import get_month_range
from fastapi import APIRouter, HTTPException, Query, Request
from pydantic import BaseModel
import logging
from postgreSQL.admin.activity_log import log_admin_activity

logger = logging.getLogger(__name__)
router = APIRouter()

class AdminUserCreate(BaseModel):
    email: str
    password: str
    role: str = "user"

class AdminUserUpdate(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None
    password: Optional[str] = None

def get_all_admin_users() -> List[Dict[str, Any]]:
    """Get all users from the database with role information"""
    try:
        logger.debug("Fetching all users from PostgreSQL")
        
        # Get users with their roles from user_roles table
        query = """
        SELECT 
            u.id,
            u.id as user_id,
            u.email,
            u.email as name,
            COALESCE(ur.role::text, CASE WHEN a.id IS NOT NULL THEN 'affiliate' ELSE 'user' END, 'user') as role,
            CASE 
                WHEN u.deleted_at IS NULL THEN 'active'
                ELSE 'inactive'
            END as status,
            u.created_at
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN affiliates a ON u.id = a.user_id
        WHERE u.deleted_at IS NULL
        ORDER BY u.created_at DESC
        """
        
        result = DatabaseInterface.execute_query(query)
        
        # Convert to the expected format
        users = []
        for row in result:
            users.append({
                "id": str(row['id']),
                "user_id": str(row['user_id']),
                "name": row['name'] or row['email'],
                "email": row['email'],
                "role": row['role'],
                "status": row['status'],
                "created_at": row['created_at'].isoformat() if row['created_at'] else None
            })
        
        logger.debug(f"Users result: {len(users)} users found")
        return users
        
    except Exception as e:
        logger.error(f"Error fetching users: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_user_stats() -> Dict[str, Any]:
    """Get user statistics including monthly changes"""
    try:
        logger.debug("Calculating user statistics")
        
        # Get current month and last month date ranges
        current_start, current_end = get_month_range(0)  # Current month
        last_start, last_end = get_month_range(1)        # Last month
        
        # Total counts
        total_users_query = "SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL"
        total_users_result = DatabaseInterface.execute_query(total_users_query)
        total_users = total_users_result[0]['count'] if total_users_result else 0
        
        # Total affiliates
        total_affiliates_query = """
        SELECT COUNT(*) as count 
        FROM affiliates a 
        JOIN users u ON a.user_id = u.id 
        WHERE u.deleted_at IS NULL
        """
        total_affiliates_result = DatabaseInterface.execute_query(total_affiliates_query)
        total_affiliates = total_affiliates_result[0]['count'] if total_affiliates_result else 0
        
        # Total admins (for now, we'll assume non-affiliates are admins or regular users)
        total_admins = total_users - total_affiliates
        
        # New users this month
        new_users_this_month_query = """
        SELECT COUNT(*) as count 
        FROM users 
        WHERE created_at >= %s AND created_at < %s AND deleted_at IS NULL
        """
        new_users_this_month_result = DatabaseInterface.execute_query(
            new_users_this_month_query, 
            (current_start, current_end)
        )
        new_users_this_month = new_users_this_month_result[0]['count'] if new_users_this_month_result else 0
        
        # New users last month
        new_users_last_month_query = """
        SELECT COUNT(*) as count 
        FROM users 
        WHERE created_at >= %s AND created_at < %s AND deleted_at IS NULL
        """
        new_users_last_month_result = DatabaseInterface.execute_query(
            new_users_last_month_query, 
            (last_start, last_end)
        )
        new_users_last_month = new_users_last_month_result[0]['count'] if new_users_last_month_result else 0
        
        # New affiliates this month
        new_affiliates_this_month_query = """
        SELECT COUNT(*) as count 
        FROM affiliates a
        JOIN users u ON a.user_id = u.id
        WHERE a.created_at >= %s AND a.created_at < %s AND u.deleted_at IS NULL
        """
        new_affiliates_this_month_result = DatabaseInterface.execute_query(
            new_affiliates_this_month_query, 
            (current_start, current_end)
        )
        new_affiliates_this_month = new_affiliates_this_month_result[0]['count'] if new_affiliates_this_month_result else 0
        
        # New affiliates last month
        new_affiliates_last_month_query = """
        SELECT COUNT(*) as count 
        FROM affiliates a
        JOIN users u ON a.user_id = u.id
        WHERE a.created_at >= %s AND a.created_at < %s AND u.deleted_at IS NULL
        """
        new_affiliates_last_month_result = DatabaseInterface.execute_query(
            new_affiliates_last_month_query, 
            (last_start, last_end)
        )
        new_affiliates_last_month = new_affiliates_last_month_result[0]['count'] if new_affiliates_last_month_result else 0
        
        # Calculate percentage changes
        def calculate_percentage_change(current, previous):
            if previous == 0:
                return "+100%" if current > 0 else "0%"
            change = ((current - previous) / previous) * 100
            return f"+{change:.1f}%" if change > 0 else f"{change:.1f}%"
        
        users_change = calculate_percentage_change(new_users_this_month, new_users_last_month)
        affiliates_change = calculate_percentage_change(new_affiliates_this_month, new_affiliates_last_month)
        
        return {
            "total_users": total_users,
            "total_admins": total_admins,
            "total_affiliates": total_affiliates,
            "new_users_this_month": new_users_this_month,
            "new_affiliates_this_month": new_affiliates_this_month,
            "users_percentage_change": users_change,
            "affiliates_percentage_change": affiliates_change
        }
        
    except Exception as e:
        logger.error(f"Error calculating user stats: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def create_admin_user(user_data: AdminUserCreate, request: Request) -> Dict[str, Any]:
    """Create a new user"""
    try:
        logger.debug(f"Creating user: {user_data.email}")
        
        # Hash the password (simple hash for demo - in production use proper bcrypt)
        import hashlib
        password_hash = hashlib.sha256(user_data.password.encode()).hexdigest()
        
        # Insert user
        user_insert_query = """
        INSERT INTO users (email, password_hash, created_at, updated_at)
        VALUES (%s, %s, NOW(), NOW())
        RETURNING id, email, created_at
        """
        
        user_result = DatabaseInterface.execute_query(
            user_insert_query, 
            (user_data.email, password_hash)
        )
        
        if not user_result:
            raise HTTPException(status_code=500, detail="Failed to create user")
        
        user = user_result[0]

        # Insert user role into user_roles table
        role_insert_query = """
        INSERT INTO user_roles (user_id, role, created_at, updated_at)
        VALUES (%s, %s, NOW(), NOW())
        """
        DatabaseInterface.execute_query(
            role_insert_query,
            (user['id'], user_data.role)
        )
        
        # If role is affiliate, create affiliate record
        if user_data.role == "affiliate":
            affiliate_insert_query = """
            INSERT INTO affiliates (user_id, referral_code, commission_rate, created_at, updated_at)
            VALUES (%s, %s, %s, NOW(), NOW())
            """
            
            # Generate a simple referral code
            import uuid
            ref_code = f"REF{str(uuid.uuid4())[:8].upper()}"
            
            DatabaseInterface.execute_query(
                affiliate_insert_query,
                (user['id'], ref_code, 0.15)  # Default 15% commission
            )
        
        # Log admin activity
        admin_id = getattr(request.state.user, "id", None) if hasattr(request.state, "user") else None
        log_admin_activity(
            event_type='create_admin_user',
            performed_by=admin_id,
            details=f"Created admin user: {user_data.email}",
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent")
        )

        new_user = {
            "id": str(user['id']),
            "user_id": str(user['id']),
            "name": user['email'],
            "email": user['email'],
            "role": user_data.role,
            "status": "active",
            "created_at": user['created_at'].isoformat() if user['created_at'] else None
        }
        
        logger.debug(f"User created: {new_user}")
        return new_user
        
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/users")
async def api_get_admin_users(
    role: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    from_: Optional[str] = Query(None, alias="from"),
    to: Optional[str] = Query(None)
):
    """API endpoint to get all users with optional filters"""
    logger.info("API endpoint GET /admin/users called")
    try:
        base_query = """
        SELECT 
            u.id,
            u.id as user_id,
            u.email,
            u.email as name,
            COALESCE(ur.role::text, CASE WHEN a.id IS NOT NULL THEN 'affiliate' ELSE 'user' END, 'user') as role,
            CASE 
                WHEN u.deleted_at IS NULL THEN 'active'
                ELSE 'inactive'
            END as status,
            u.created_at
        FROM users u
        LEFT JOIN user_roles ur ON u.id = ur.user_id
        LEFT JOIN affiliates a ON u.id = a.user_id
        WHERE 1=1
        """
        params = []
        if role and role != "all":
            base_query += " AND (COALESCE(ur.role, CASE WHEN a.id IS NOT NULL THEN 'affiliate' ELSE 'user' END, 'user') = %s) "
            params.append(role)
        if status and status != "all":
            if status == "suspended":
                base_query += " AND u.deleted_at IS NOT NULL "
            else:
                base_query += " AND (CASE WHEN u.deleted_at IS NULL THEN 'active' ELSE 'inactive' END) = %s "
                params.append(status)
        if from_:
            base_query += " AND u.created_at >= %s "
            params.append(from_)
        if to:
            base_query += " AND u.created_at <= %s "
            params.append(to)
        base_query += " ORDER BY u.created_at DESC"
        result = DatabaseInterface.execute_query(base_query, tuple(params))
        users = []
        for row in result:
            users.append({
                "id": str(row['id']),
                "user_id": str(row['user_id']),
                "name": row['name'] or row['email'],
                "email": row['email'],
                "role": row['role'],
                "status": row['status'],
                "created_at": row['created_at'].isoformat() if row['created_at'] else None
            })
        logger.info(f"Successfully returning {len(users)} users")
        return users
    except Exception as e:
        logger.error(f"Error in api_get_admin_users: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user-stats")
async def api_get_user_stats():
    """API endpoint to get user statistics"""
    logger.info("API endpoint GET /admin/user-stats called")
    try:
        result = get_user_stats()
        logger.info(f"Successfully returning user stats")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_user_stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/users")
async def api_create_admin_user(user: AdminUserCreate, request: Request):
    """API endpoint to create a new user"""
    logger.info("API endpoint POST /admin/users called")
    try:
        result = create_admin_user(user, request)
        logger.info(f"Successfully created user: {result['id']}")
        return result
    except Exception as e:
        logger.error(f"API error creating user: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/users/{user_id}")
async def api_update_admin_user(user_id: str, updates: AdminUserUpdate, request: Request):
    """API endpoint to update a user"""
    logger.info(f"API endpoint POST /admin/users/{user_id} called")
    try:
        logger.info(f"Updating user {user_id} with {updates}")
        # Update user fields
        if updates.email:
            update_query = """
            UPDATE users SET email = %s, updated_at = NOW() WHERE id = %s
            """
            DatabaseInterface.execute_query(update_query, (updates.email, user_id))
        if updates.password:
            import hashlib
            password_hash = hashlib.sha256(updates.password.encode()).hexdigest()
            update_query = """
            UPDATE users SET password_hash = %s, updated_at = NOW() WHERE id = %s
            """
            DatabaseInterface.execute_query(update_query, (password_hash, user_id))
        if updates.role:
            # Update user_roles table
            update_role_query = """
            UPDATE user_roles SET role = %s, updated_at = NOW() WHERE user_id = %s
            """
            DatabaseInterface.execute_query(update_role_query, (updates.role, user_id))
        if updates.status:
            if updates.status == "active":
                # Reactivate user
                reactivate_query = """
                UPDATE users SET deleted_at = NULL, updated_at = NOW() WHERE id = %s
                """
                DatabaseInterface.execute_query(reactivate_query, (user_id,))
            elif updates.status == "inactive":
                # Soft delete user
                deactivate_query = """
                UPDATE users SET deleted_at = NOW(), updated_at = NOW() WHERE id = %s
                """
                DatabaseInterface.execute_query(deactivate_query, (user_id,))
        # Log admin activity
        admin_id = getattr(request.state.user, "id", None) if hasattr(request.state, "user") else None
        log_admin_activity(
            event_type='update_admin_user',
            performed_by=admin_id,
            details=f"Updated admin user: {user_id}",
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent")
        )
        return {"message": "User updated successfully", "user_id": user_id}
    except Exception as e:
        logger.error(f"API error updating user: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/users/{user_id}")
async def api_delete_admin_user(user_id: str, request: Request):
    """API endpoint to delete a user (soft delete)"""
    logger.info(f"API endpoint DELETE /admin/users/{user_id} called")
    try:
        # Soft delete by setting deleted_at timestamp
        delete_query = """
        UPDATE users 
        SET deleted_at = NOW(), updated_at = NOW()
        WHERE id = %s
        """
        
        DatabaseInterface.execute_query(delete_query, (user_id,))
        
        # Log admin activity
        admin_id = getattr(request.state.user, "id", None) if hasattr(request.state, "user") else None
        log_admin_activity(
            event_type='delete_admin_user',
            performed_by=admin_id,
            details=f"Deleted admin user: {user_id}",
            ip_address=request.client.host if request.client else None,
            user_agent=request.headers.get("user-agent")
        )
        logger.info(f"Successfully soft-deleted user {user_id}")
        return {"message": "User deleted successfully", "user_id": user_id}
    except Exception as e:
        logger.error(f"API error deleting user: {e}")
        raise HTTPException(status_code=500, detail=str(e))
