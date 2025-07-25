from typing import List, Dict, Any
from ..database import DatabaseInterface
from ..helpers import get_month_range
from fastapi import APIRouter, HTTPException, Body
import logging
from uuid import uuid4
from datetime import datetime, timezone
from postgreSQL.admin.activity_log import log_admin_activity

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

def get_count_change(table: str, date_field: str = "created_at") -> Dict[str, Any]:
    current_start, current_end = get_month_range(0)
    previous_start, previous_end = get_month_range(1)

    query = f"""
        SELECT COUNT(*) as count FROM {table}
        WHERE {date_field} >= %s AND {date_field} < %s
    """

    current_result = DatabaseInterface.execute_query(query, (current_start, current_end))
    previous_result = DatabaseInterface.execute_query(query, (previous_start, previous_end))

    current = current_result[0]['count'] if current_result else 0
    previous = previous_result[0]['count'] if previous_result else 0

    change = ((current - previous) / previous * 100) if previous else 100.0
    return {"count": current, "change_pct": round(change, 2)}

def get_total_users() -> Dict[str, Any]:
    try:
        query = "SELECT COUNT(*) as count FROM users"
        logger.debug(f"Executing query: {query}")
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Query result: {result}")
        count = result[0]['count'] if result else 0
        return {"count": count}
    except Exception as e:
        logger.error(f"Error getting total users: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_total_affiliates() -> Dict[str, Any]:
    return get_count_change("affiliates")

def get_active_subscriptions() -> Dict[str, Any]:
    query = "SELECT COUNT(*) as count FROM subscriptions WHERE status = 'active'"
    result = DatabaseInterface.execute_query(query)
    count = result[0]['count'] if result else 0
    return {"count": count, "change_pct": None}

def get_monthly_revenue() -> Dict[str, Any]:
    current_start, current_end = get_month_range(0)
    previous_start, previous_end = get_month_range(1)

    query = """
        SELECT COALESCE(SUM(commission_amount), 0) as revenue
        FROM referrals
        WHERE created_at >= %s AND created_at < %s
    """

    current_result = DatabaseInterface.execute_query(query, (current_start, current_end))
    previous_result = DatabaseInterface.execute_query(query, (previous_start, previous_end))

    current = float(current_result[0]['revenue']) if current_result else 0.0
    previous = float(previous_result[0]['revenue']) if previous_result else 0.0

    change = ((current - previous) / previous * 100) if previous else 100.0
    return {"revenue": current, "change_pct": round(change, 2)}

def get_commissions_paid() -> Dict[str, Any]:
    return get_monthly_revenue()

def get_commissions_paid_total() -> float:
    query = "SELECT COALESCE(SUM(commission_amount), 0) AS total FROM referrals"
    result = DatabaseInterface.execute_query(query)
    return float(result[0]['total']) if result else 0.0

def get_recent_activity() -> List[Dict[str, Any]]:
    query = """
        SELECT event_type, user_id, created_at AS timestamp, details
        FROM admin_activity_log
        ORDER BY created_at DESC
        LIMIT 20;
    """
    return DatabaseInterface.execute_query(query)

def get_admin_activity() -> List[Dict[str, Any]]:
    try:
        query = """
            SELECT 
                a.id,
                a.event_type,
                COALESCE(u.email, 'System') as performed_by_email,
                a.details,
                a.created_at as timestamp,
                a.ip_address,
                a.user_agent
            FROM admin_activity_log a
            LEFT JOIN users u ON a.performed_by = u.id
            ORDER BY a.created_at DESC
            LIMIT 20;
        """
        logger.debug(f"Executing admin activity query: {query}")
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Admin activity result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error getting admin activity: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def get_signups_over_time() -> List[Dict[str, Any]]:
    try:
        query = """
            WITH RECURSIVE months AS (
                -- Base case
                SELECT DATE_TRUNC('month', MAX(created_at)) AS month
                FROM users

                UNION ALL

                -- Recursive case
                SELECT DATE_TRUNC('month', month - INTERVAL '1 month')
                FROM months
                WHERE month > NOW() - INTERVAL '12 months'
            ),
            monthly_counts AS (
                SELECT DATE_TRUNC('month', created_at) AS month,
                       COUNT(*) AS count
                FROM users
                GROUP BY DATE_TRUNC('month', created_at)
            )
            SELECT 
                TO_CHAR(m.month, 'YYYY-MM-DD') as month,
                COALESCE(mc.count, 0) as count
            FROM months m
            LEFT JOIN monthly_counts mc ON m.month = mc.month
            ORDER BY m.month ASC;
        """
        logger.debug(f"Executing signups over time query: {query}")
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Signups result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error getting signups over time: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def get_revenue_over_time() -> List[Dict[str, Any]]:
    query = """
        SELECT DATE_TRUNC('month', created_at) AS month,
               SUM(commission_amount) AS revenue
        FROM referrals
        GROUP BY month
        ORDER BY month ASC
        LIMIT 6;
    """
    return DatabaseInterface.execute_query(query)

def get_active_vs_inactive_users() -> Dict[str, int]:
    try:
        query = """
            SELECT 
                COUNT(CASE WHEN deleted_at IS NULL THEN 1 END) as active,
                COUNT(CASE WHEN deleted_at IS NOT NULL THEN 1 END) as inactive
            FROM users;
        """
        result = DatabaseInterface.execute_query(query)
        return {
            "active": result[0]['active'] or 0,
            "inactive": result[0]['inactive'] or 0
        }
    except Exception as e:
        logger.error(f"Error getting active/inactive counts: {str(e)}")
        return {"active": 0, "inactive": 0}

def get_promo_usage() -> List[Dict[str, Any]]:
    query = """
        SELECT code, COUNT(*) AS usage_count
        FROM promo_usages
        GROUP BY code
        ORDER BY usage_count DESC;
    """
    return DatabaseInterface.execute_query(query)

def get_transactions_table() -> List[Dict[str, Any]]:
    query = """
        SELECT 
            t.id AS transaction_id,
            u.id AS user_id,
            u.email,
            t.amount,
            t.type,
            t.status,
            t.gateway,
            t.created_at
        FROM transactions t
        LEFT JOIN users u ON t.user_id = u.id
        ORDER BY t.created_at DESC;
    """
    return DatabaseInterface.execute_query(query)

def get_user_counts_by_role() -> Dict[str, int]:
    try:
        query = """
            SELECT 
                COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
                COUNT(CASE WHEN role = 'affiliate' THEN 1 END) as affiliate_count,
                COUNT(CASE WHEN role = 'user' THEN 1 END) as user_count
            FROM user_roles;
        """
        logger.debug(f"Executing role count query: {query}")
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Raw SQL result: {result}")
        
        if not result:
            return {"admins": 0, "affiliates": 0, "users": 0}
            
        counts = {
            "admins": result[0]['admin_count'] or 0,
            "affiliates": result[0]['affiliate_count'] or 0,
            "users": result[0]['user_count'] or 0
        }
        return counts
    except Exception as e:
        logger.error(f"Error in get_user_counts_by_role: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def get_new_users_count() -> Dict[str, Any]:
    try:
        query = """
        WITH counts AS (
            SELECT 
                COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as current_count,
                COUNT(CASE WHEN created_at >= NOW() - INTERVAL '60 days' 
                          AND created_at < NOW() - INTERVAL '30 days' THEN 1 END) as previous_count
            FROM users
        )
        SELECT 
            current_count,
            CASE 
                WHEN previous_count = 0 AND current_count > 0 THEN 100
                WHEN previous_count = 0 THEN 0
                ELSE ((current_count::float - previous_count::float) / previous_count::float) * 100
            END as change_pct
        FROM counts;
        """
        logger.debug(f"Executing new users query: {query}")
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"New users result: {result}")
        
        response = {
            "count": int(result[0]['current_count'] or 0),
            "change_pct": float(result[0]['change_pct'] or 0)
        }
        logger.debug(f"Final response: {response}")
        return response
    except Exception as e:
        logger.error(f"Error in new users count: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def get_users_list() -> List[Dict[str, Any]]:
    try:
        query = """
            SELECT 
                u.id,
                u.email,
                u.email as name,
                COALESCE(ur.role, 'user') as role,
                CASE 
                    WHEN u.deleted_at IS NOT NULL THEN 'suspended'
                    ELSE 'active'
                END as status,
                u.created_at
            FROM users u
            LEFT JOIN user_roles ur ON u.id = ur.user_id
            ORDER BY u.created_at DESC;
        """
        logger.debug(f"Executing users list query: {query}")
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Users list result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error getting users list: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def get_user_activities() -> List[Dict[str, Any]]:
    try:
        query = """
            SELECT 
                ua.id,
                ua.created_at as timestamp,
                ua.event_type,
                u.email as performed_by,
                ua.details,
                ua.ip_address
            FROM user_activity_log ua
            LEFT JOIN users u ON ua.user_id = u.id
            ORDER BY ua.created_at DESC
            LIMIT 50;
        """
        logger.debug(f"Executing user activities query: {query}")
        return DatabaseInterface.execute_query(query)
    except Exception as e:
        logger.error(f"Error getting user activities: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def get_support_tickets() -> List[Dict[str, Any]]:
    try:
        query = """
            SELECT 
                t.id as ticket_id,
                u.email as user_email,
                t.subject,
                t.status,
                t.updated_at as last_updated,
                admin.email as assigned_admin,
                t.priority,
                t.message
            FROM support_tickets t
            LEFT JOIN users u ON t.user_id = u.id
            LEFT JOIN users admin ON t.assigned_admin_id = admin.id
            ORDER BY t.updated_at DESC;
        """
        logger.debug(f"Executing support tickets query: {query}")
        result = DatabaseInterface.execute_query(query)
        logger.debug(f"Support tickets result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error getting support tickets: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/total-users")  # Remove /analytics prefix from here
def api_get_total_users():
    return get_total_users()

@router.get("/total-affiliates")
def api_get_total_affiliates():
    return get_total_affiliates()

@router.get("/active-subscriptions")
def api_get_active_subscriptions():
    return get_active_subscriptions()

@router.get("/monthly-revenue")
def api_get_monthly_revenue():
    return get_monthly_revenue()

@router.get("/commissions-paid")
def api_get_commissions_paid():
    return get_commissions_paid()

@router.get("/commissions-paid-total")
def api_get_commissions_paid_total():
    return {"total": get_commissions_paid_total()}

@router.get("/recent-activity")
def api_get_recent_activity():
    return get_recent_activity()

@router.get("/signups-over-time")
def api_get_signups_over_time():
    return get_signups_over_time()

@router.get("/revenue-over-time")
def api_get_revenue_over_time():
    return get_revenue_over_time()

@router.get("/active-vs-inactive-users")
def api_get_active_vs_inactive_users():
    return get_active_vs_inactive_users()

@router.get("/promo-usage")
def api_get_promo_usage():
    return get_promo_usage()

@router.get("/transactions-table")
def api_get_transactions_table():
    return get_transactions_table()

@router.get("/user-role-counts")
async def api_get_user_role_counts():
    try:
        logger.debug("Handling /user-role-counts request")
        counts = get_user_counts_by_role()
        logger.debug(f"Role counts: {counts}")
        return counts
    except Exception as e:
        logger.error(f"Error handling user role counts request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/new-users-30")  # Changed from /new-users-30d to match frontend
def api_get_new_users():
    logger.debug("Handling /new-users-30 request")
    return get_new_users_count()

@router.get("/users-list")
async def api_get_users_list():
    return get_users_list()

@router.get("/user-activities")
async def api_get_user_activities():
    return get_user_activities()

@router.get("/support-tickets")
async def api_get_support_tickets():
    logger.debug("Handling /support-tickets request")
    return get_support_tickets()

@router.get("/admin-activity")
async def api_get_admin_activity():
    logger.debug("Handling /admin-activity request")
    return get_admin_activity()

@router.put("/users/{user_id}")
async def update_user(user_id: str, user_data: dict):
    try:
        query = """
            UPDATE users 
            SET email = %s, 
                updated_at = NOW()
            WHERE id = %s
            RETURNING id;
        """
        result = DatabaseInterface.execute_query(
            query, 
            (user_data['email'], user_id)
        )
        
        if result:
            # Update role if changed
            if 'role' in user_data:
                role_query = """
                    UPDATE user_roles
                    SET role = %s
                    WHERE user_id = %s;
                """
                DatabaseInterface.execute_query(role_query, (user_data['role'], user_id))
                
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/users/{user_id}/status")
async def update_user_status(user_id: str, status_data: dict):
    try:
        query = """
            UPDATE users 
            SET deleted_at = CASE 
                WHEN %s = 'suspended' THEN NOW()
                ELSE NULL
            END,
            updated_at = NOW()
            WHERE id = %s
            RETURNING id;
        """
        result = DatabaseInterface.execute_query(
            query, 
            (status_data['status'], user_id)
        )
        return {"success": bool(result)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    try:
        # Soft delete by setting deleted_at
        query = """
            UPDATE users 
            SET deleted_at = NOW(),
                updated_at = NOW()
            WHERE id = %s
            RETURNING id;
        """
        result = DatabaseInterface.execute_query(query, (user_id,))
        return {"success": bool(result)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/support-tickets")
async def create_support_ticket(ticket: dict = Body(...)):
    logger.debug(f"Received create ticket request: {ticket}")
    try:
        # Lookup user_id from user_email
        user_email = ticket.get("user_email")
        user_id_query = "SELECT id FROM users WHERE email = %s LIMIT 1;"
        user_id_result = DatabaseInterface.execute_query(user_id_query, (user_email,))
        if not user_id_result:
            logger.error("User email not found")
            raise HTTPException(status_code=400, detail="User email not found")
        user_id = user_id_result[0]["id"]

        # Lookup assigned_admin_id from assigned_admin (email), if provided
        assigned_admin_id = None
        assigned_admin_email = ticket.get("assigned_admin")
        if assigned_admin_email:
            admin_id_query = "SELECT id FROM users WHERE email = %s LIMIT 1;"
            admin_id_result = DatabaseInterface.execute_query(admin_id_query, (assigned_admin_email,))
            if admin_id_result:
                assigned_admin_id = admin_id_result[0]["id"]

        ticket_id = str(uuid4())
        now = datetime.now(timezone.utc)
        status = ticket.get("status", "open")
        # Validate status
        valid_status_query = "SELECT status FROM support_ticket_status WHERE status = %s LIMIT 1;"
        status_result = DatabaseInterface.execute_query(valid_status_query, (status,))
        if not status_result:
            logger.error("Invalid status value")
            raise HTTPException(status_code=400, detail="Invalid status value")
        query = """
            INSERT INTO support_tickets (
                id, user_id, subject, message, status, priority, assigned_admin_id, created_at, updated_at, comments, closed_at
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
        """
        params = (
            ticket_id,
            user_id,
            ticket.get("subject"),
            ticket.get("message", ""),
            status,
            ticket.get("priority", "normal"),
            assigned_admin_id,
            now,
            now,
            ticket.get("comments", ""),
            ticket.get("closed_at")
        )
        logger.debug(f"Insert params: {params}")
        result = DatabaseInterface.execute_query(query, params)
        logger.debug(f"Insert result: {result}")
        if result:
            # Log admin activity
            log_admin_activity(
                event_type="create_support_ticket",
                performed_by=None,  # You can pass admin user ID if available
                details=f"Created support ticket: {ticket.get('subject')} for user {user_email}",
                ip_address=None,
                user_agent=None
            )
            return {"success": True, "ticket_id": ticket_id}
        else:
            logger.error("Failed to create ticket")
            raise HTTPException(status_code=500, detail="Failed to create ticket")
    except Exception as e:
        logger.error(f"Error creating support ticket: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/support-tickets/{ticket_id}")
async def update_support_ticket(ticket_id: str, ticket: dict = Body(...)):
    logger.debug(f"Received update ticket request: {ticket}")
    try:
        # Lookup user_id from user_email
        user_email = ticket.get("user_email")
        user_id_query = "SELECT id FROM users WHERE email = %s LIMIT 1;"
        user_id_result = DatabaseInterface.execute_query(user_id_query, (user_email,))
        if not user_id_result:
            logger.error("User email not found")
            raise HTTPException(status_code=400, detail="User email not found")
        user_id = user_id_result[0]["id"]

        # Lookup assigned_admin_id from assigned_admin (email), if provided
        assigned_admin_id = None
        assigned_admin_email = ticket.get("assigned_admin")
        if assigned_admin_email:
            admin_id_query = "SELECT id FROM users WHERE email = %s LIMIT 1;"
            admin_id_result = DatabaseInterface.execute_query(admin_id_query, (assigned_admin_email,))
            if admin_id_result:
                assigned_admin_id = admin_id_result[0]["id"]

        status = ticket.get("status", "open")
        # Validate status
        valid_status_query = "SELECT status FROM support_ticket_status WHERE status = %s LIMIT 1;"
        status_result = DatabaseInterface.execute_query(valid_status_query, (status,))
        if not status_result:
            logger.error("Invalid status value")
            raise HTTPException(status_code=400, detail="Invalid status value")
        now = datetime.now(timezone.utc)
        query = """
            UPDATE support_tickets SET
                user_id = %s,
                subject = %s,
                message = %s,
                status = %s,
                priority = %s,
                assigned_admin_id = %s,
                updated_at = %s,
                comments = %s,
                closed_at = %s
            WHERE id = %s
            RETURNING id;
        """
        params = (
            user_id,
            ticket.get("subject"),
            ticket.get("message", ""),
            status,
            ticket.get("priority", "normal"),
            assigned_admin_id,
            now,
            ticket.get("comments", ""),
            ticket.get("closed_at"),
            ticket_id
        )
        logger.debug(f"Update params: {params}")
        result = DatabaseInterface.execute_query(query, params)
        logger.debug(f"Update result: {result}")
        if result:
            # Log admin activity
            log_admin_activity(
                event_type="update_support_ticket",
                performed_by=None,  # You can pass admin user ID if available
                details=f"Updated support ticket: {ticket.get('subject')} for user {user_email}",
                ip_address=None,
                user_agent=None
            )
            return {"success": True, "ticket_id": ticket_id}
        else:
            logger.error("Failed to update ticket")
            raise HTTPException(status_code=500, detail="Failed to update ticket")
    except Exception as e:
        logger.error(f"Error updating support ticket: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
