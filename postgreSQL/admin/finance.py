from typing import List, Dict, Any, Optional
from datetime import datetime
from postgreSQL.database import DatabaseInterface
from fastapi import APIRouter, HTTPException, Query, Body, Request
from pydantic import BaseModel
import logging
from postgreSQL.admin.activity_log import log_admin_activity

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create the router instance
router = APIRouter()

class PromoCodeCreate(BaseModel):
    code: str
    discount_percent: float
    expiration_date: Optional[str] = None
    max_uses: Optional[int] = None
    status: str = 'active'

class PlanUpdate(BaseModel):
    name: Optional[str]
    price: Optional[float]
    duration: Optional[str]
    description: Optional[str]
    status: Optional[str]

class PlanCreate(BaseModel):
    name: str
    price: float
    duration: str
    description: Optional[str] = ""
    status: str

def get_transactions(search: str = None, type_filter: str = None, status_filter: str = None) -> List[Dict[str, Any]]:
    """Get all transactions from the database with optional filters"""
    try:
        logger.debug("Fetching transactions from PostgreSQL")
        
        query = """
        SELECT 
            t.id,
            t.user_id,
            COALESCE(up.first_name || ' ' || up.last_name, 'Unknown User') as user_name,
            COALESCE(up.email, 'No email') as email,
            t.amount,
            t.type,
            t.status,
            t.gateway,
            t.created_at
        FROM transactions t
        LEFT JOIN user_profiles up ON t.user_id = up.user_id
        ORDER BY t.created_at DESC
        """
        
        try:
            result = DatabaseInterface.execute_query(query)
        except Exception as db_error:
            logger.warning(f"Database query failed, trying simplified query: {db_error}")
            # Fallback to simpler query if joins fail
            simple_query = """
            SELECT 
                id,
                user_id,
                amount,
                type,
                status,
                gateway,
                created_at
            FROM transactions
            ORDER BY created_at DESC
            """
            result = DatabaseInterface.execute_query(simple_query)
            
            # Add default values for missing fields
            for row in result:
                row['user_name'] = f"User {row['user_id'][:8]}"
                row['email'] = 'email@example.com'
        
        # Apply filters
        if type_filter and type_filter != 'all-types' and result:
            result = [t for t in result if t["type"] == type_filter]
        
        if status_filter and status_filter != 'all-status' and result:
            result = [t for t in result if t["status"] == status_filter]
        
        if search and result:
            search_lower = search.lower()
            result = [
                t for t in result
                if search_lower in str(t.get("user_name", "")).lower() or 
                   search_lower in str(t.get("email", "")).lower() or
                   search_lower in str(t.get("id", "")).lower()
            ]
        
        logger.debug(f"Transactions result: {len(result)} transactions found")
        return result
        
    except Exception as e:
        logger.error(f"Error fetching transactions: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_plans(search: str = None, status_filter: str = None) -> List[Dict[str, Any]]:
    """Get all plans from the database with optional filters"""
    try:
        logger.debug("Fetching plans from PostgreSQL")
        
        query = """
        SELECT 
            p.id,
            p.name,
            p.price,
            p.duration,
            p.description,
            p.status,
            COUNT(s.id) as subscriber_count,
            p.created_at
        FROM plans p
        LEFT JOIN subscriptions s ON p.id = s.plan_id AND s.status = 'active'
        GROUP BY p.id, p.name, p.price, p.duration, p.description, p.status, p.created_at
        ORDER BY p.created_at DESC
        """
        
        result = DatabaseInterface.execute_query(query)
        
        # Apply filters
        if status_filter and status_filter != 'all-status' and result:
            result = [p for p in result if p["status"] == status_filter]
        
        if search and result:
            search_lower = search.lower()
            result = [
                p for p in result
                if search_lower in str(p.get("name", "")).lower() or 
                   search_lower in str(p.get("description", "")).lower()
            ]
        
        logger.debug(f"Plans result: {len(result)} plans found")
        return result
        
    except Exception as e:
        logger.error(f"Error fetching plans: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_subscriptions(search: str = None, plan_filter: str = None, status_filter: str = None) -> List[Dict[str, Any]]:
    """Get all subscriptions from the database with optional filters"""
    try:
        logger.debug("Fetching subscriptions from PostgreSQL")
        
        query = """
        SELECT 
            s.id,
            s.user_id,
            COALESCE(up.first_name || ' ' || up.last_name, 'Unknown User') as user_name,
            pl.name as plan_name,
            s.status,
            s.current_period_start,
            s.current_period_end,
            s.stripe_customer_id,
            CASE WHEN s.cancel_at_period_end = true THEN false ELSE true END as auto_renew,
            s.created_at
        FROM subscriptions s
        LEFT JOIN user_profiles up ON s.user_id = up.user_id
        LEFT JOIN plans pl ON s.plan_id = pl.id
        WHERE s.deleted_at IS NULL
        ORDER BY s.created_at DESC
        """
        
        try:
            result = DatabaseInterface.execute_query(query)
        except Exception as db_error:
            logger.warning(f"Database query failed, trying simplified query: {db_error}")
            # Fallback to simpler query if joins fail
            simple_query = """
            SELECT 
                id,
                user_id,
                status,
                current_period_start,
                current_period_end,
                stripe_customer_id,
                cancel_at_period_end,
                created_at
            FROM subscriptions
            WHERE deleted_at IS NULL
            ORDER BY created_at DESC
            """
            result = DatabaseInterface.execute_query(simple_query)
            
            # Add default values for missing fields
            for row in result:
                row['user_name'] = f"User {row['user_id'][:8]}"
                row['plan_name'] = 'Unknown Plan'
                row['auto_renew'] = not row.get('cancel_at_period_end', False)
        
        # Apply filters
        if plan_filter and plan_filter != 'all-plans' and result:
            result = [s for s in result if s["plan_name"].lower() == plan_filter.lower()]
        
        if status_filter and status_filter != 'all-status' and result:
            result = [s for s in result if s["status"] == status_filter]
        
        if search and result:
            search_lower = search.lower()
            result = [
                s for s in result
                if search_lower in str(s.get("user_name", "")).lower() or 
                   search_lower in str(s.get("plan_name", "")).lower()
            ]
        
        logger.debug(f"Subscriptions result: {len(result)} subscriptions found")
        return result
        
    except Exception as e:
        logger.error(f"Error fetching subscriptions: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def parse_expiration_date(exp):
    from datetime import datetime
    import dateutil.parser
    if isinstance(exp, datetime):
        return exp
    if isinstance(exp, str):
        try:
            return dateutil.parser.isoparse(exp)
        except Exception:
            return None
    return None

def get_promo_codes(search: str = None, status_filter: str = None) -> List[Dict[str, Any]]:
    """Get all promo codes from the database with optional filters"""
    try:
        logger.debug("Fetching promo codes from PostgreSQL")
        
        query = """
        SELECT 
            pc.id,
            pc.code,
            pc.discount_percent,
            pc.expiration_date,
            pc.usage_count,
            pc.max_uses,
            pc.status,
            pc.created_at,
            pc.deleted_at
        FROM promo_codes pc
        ORDER BY pc.created_at DESC
        """
        
        result = DatabaseInterface.execute_query(query)

        # Check expiration and update status if needed
        from datetime import timezone
        now = datetime.now(timezone.utc)
        for promo in result:
            exp = promo.get("expiration_date")
            if exp and promo["status"] == "active":
                try:
                    exp_dt = parse_expiration_date(exp)
                    if exp_dt is None:
                        raise ValueError(f"Could not parse expiration_date: {exp}")
                    if exp_dt.tzinfo is None:
                        from datetime import timezone
                        exp_dt = exp_dt.replace(tzinfo=timezone.utc)
                    if exp_dt < now:
                        DatabaseInterface.update("promo_codes", {"status": "inactive", "deleted_at": now}, {"id": promo["id"]})
                        promo["status"] = "inactive"
                        promo["deleted_at"] = now.isoformat()
                except Exception as e:
                    logger.warning(f"Could not parse expiration_date for promo {promo['id']}: {e}")

        # Apply filters
        if status_filter and status_filter != 'all-status' and result:
            result = [p for p in result if p["status"] == status_filter]
        
        if search and result:
            search_lower = search.lower()
            result = [
                p for p in result
                if search_lower in str(p.get("code", "")).lower()
            ]
        
        logger.debug(f"Promo codes result: {len(result)} promo codes found")
        return result
        
    except Exception as e:
        logger.error(f"Error fetching promo codes: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def create_promo_code(promo_data: PromoCodeCreate) -> Dict[str, Any]:
    """Create a new promo code in the database"""
    try:
        logger.debug(f"Creating promo code: {promo_data.code}")
        
        # Prepare data for insertion
        insert_data = {
            'code': promo_data.code,
            'discount_percent': promo_data.discount_percent,
            'status': promo_data.status,
        }
        
        # Add optional fields if provided
        if promo_data.expiration_date:
            insert_data['expiration_date'] = promo_data.expiration_date
        if promo_data.max_uses:
            insert_data['max_uses'] = promo_data.max_uses
        
        # Insert into database
        promo_id = DatabaseInterface.insert('promo_codes', insert_data)
        
        logger.debug(f"Promo code created with ID: {promo_id}")
        return {"id": promo_id, "message": "Promo code created successfully"}
        
    except Exception as e:
        logger.error(f"Error creating promo code: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# API ENDPOINTS
@router.get("/transactions")
async def api_get_transactions(
    search: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """API endpoint to get all transactions with optional filters"""
    logger.info("=== API endpoint GET /admin/transactions called ===")
    try:
        result = get_transactions(search, type, status)
        logger.info(f"Successfully returning {len(result)} transactions")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_transactions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/plans")
async def api_get_plans(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """API endpoint to get all plans with optional filters"""
    logger.info("=== API endpoint GET /admin/plans called ===")
    try:
        result = get_plans(search, status)
        logger.info(f"Successfully returning {len(result)} plans")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_plans: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/subscriptions")
async def api_get_subscriptions(
    search: Optional[str] = Query(None),
    plan: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """API endpoint to get all subscriptions with optional filters"""
    logger.info("=== API endpoint GET /admin/subscriptions called ===")
    try:
        result = get_subscriptions(search, plan, status)
        logger.info(f"Successfully returning {len(result)} subscriptions")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_subscriptions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/promo-codes")
async def api_get_promo_codes(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """API endpoint to get all promo codes with optional filters"""
    logger.info("=== API endpoint GET /admin/promo-codes called ===")
    try:
        result = get_promo_codes(search, status)
        logger.info(f"Successfully returning {len(result)} promo codes")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_promo_codes: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/plans")
async def create_plan(request: Request, plan: PlanCreate):
    try:
        logger.info(f"Creating plan: {plan.name}")
        insert_data = plan.dict()
        plan_id = DatabaseInterface.insert("plans", insert_data)
        if not plan_id:
            raise HTTPException(status_code=500, detail="Failed to create plan")
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='create_plan',
            performed_by=admin_id,
            details=f"Created plan: {plan.name}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"id": plan_id, "message": "Plan created successfully"}
    except Exception as e:
        logger.error(f"Error creating plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/promo-codes")
async def api_create_promo_code(request: Request, promo_data: PromoCodeCreate):
    """API endpoint to create a new promo code"""
    logger.info(f"=== API endpoint POST /admin/promo-codes called ===")
    try:
        result = create_promo_code(promo_data)
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='create_promo_code',
            performed_by=admin_id,
            details=f"Created promo code: {promo_data.code}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        logger.info("Successfully created promo code")
        return result
    except Exception as e:
        logger.error(f"Error in api_create_promo_code: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/plans/{plan_id}")
async def update_plan(plan_id: str, request: Request, plan: PlanUpdate = Body(...)):
    try:
        logger.info(f"Updating plan {plan_id} with {plan}")
        update_data = {k: v for k, v in plan.dict().items() if v is not None}
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields to update")
        updated = DatabaseInterface.update("plans", update_data, {"id": plan_id})
        if not updated:
            raise HTTPException(status_code=404, detail="Plan not found")
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='update_plan',
            performed_by=admin_id,
            details=f"Updated plan: {plan_id}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"id": plan_id, "message": "Plan updated successfully"}
    except Exception as e:
        logger.error(f"Error updating plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/plans/{plan_id}/soft-delete")
async def soft_delete_plan(plan_id: str, request: Request):
    try:
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc)
        update_data = {"status": "inactive", "deleted_at": now}
        updated = DatabaseInterface.update("plans", update_data, {"id": plan_id})
        if not updated:
            raise HTTPException(status_code=404, detail="Plan not found")
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='soft_delete_plan',
            performed_by=admin_id,
            details=f"Soft-deleted plan: {plan_id}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"id": plan_id, "message": "Plan soft-deleted (status set to inactive, deleted_at set)"}
    except Exception as e:
        logger.error(f"Error soft-deleting plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/promo-codes/{promo_id}/soft-delete")
async def soft_delete_promo_code(promo_id: str, request: Request):
    try:
        from datetime import datetime, timezone
        now = datetime.now(timezone.utc)
        update_data = {"status": "inactive", "deleted_at": now}
        updated = DatabaseInterface.update("promo_codes", update_data, {"id": promo_id})
        if not updated:
            raise HTTPException(status_code=404, detail="Promo code not found")
        # Log admin activity
        admin_id = getattr(getattr(request.state, "user", None), "id", None)
        ip_address = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")
        log_admin_activity(
            event_type='soft_delete_promo_code',
            performed_by=admin_id,
            details=f"Soft-deleted promo code: {promo_id}",
            ip_address=ip_address,
            user_agent=user_agent
        )
        return {"id": promo_id, "message": "Promo code soft-deleted (status set to inactive, deleted_at set)"}
    except Exception as e:
        logger.error(f"Error soft-deleting promo code: {e}")
        raise HTTPException(status_code=500, detail=str(e))
