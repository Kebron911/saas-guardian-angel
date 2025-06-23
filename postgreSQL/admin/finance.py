
from typing import List, Dict, Any, Optional
from datetime import datetime
from postgreSQL.database import DatabaseInterface
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import logging

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

def get_transactions(search: str = None, type_filter: str = None, status_filter: str = None) -> List[Dict[str, Any]]:
    """Get all transactions from the database with optional filters"""
    try:
        logger.debug("Fetching transactions from PostgreSQL")
        
        query = """
        SELECT 
            t.id,
            t.user_id,
            COALESCE(p.first_name || ' ' || p.last_name, 'Unknown User') as user_name,
            COALESCE(au.email, 'No email') as email,
            t.amount,
            t.type,
            t.status,
            t.gateway,
            t.created_at
        FROM transactions t
        LEFT JOIN profiles p ON t.user_id = p.id
        LEFT JOIN auth.users au ON t.user_id = au.id
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
            COALESCE(p.first_name || ' ' || p.last_name, 'Unknown User') as user_name,
            pl.name as plan_name,
            s.status,
            s.current_period_start,
            s.current_period_end,
            s.stripe_customer_id,
            CASE WHEN s.cancel_at_period_end = true THEN false ELSE true END as auto_renew,
            s.created_at
        FROM subscriptions s
        LEFT JOIN profiles p ON s.user_id = p.id
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
            pc.created_at
        FROM promo_codes pc
        ORDER BY pc.created_at DESC
        """
        
        result = DatabaseInterface.execute_query(query)
        
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

@router.post("/promo-codes")
async def api_create_promo_code(promo_data: PromoCodeCreate):
    """API endpoint to create a new promo code"""
    logger.info(f"=== API endpoint POST /admin/promo-codes called ===")
    try:
        result = create_promo_code(promo_data)
        logger.info("Successfully created promo code")
        return result
    except Exception as e:
        logger.error(f"Error in api_create_promo_code: {e}")
        raise HTTPException(status_code=500, detail=str(e))

logger.info("=== FINANCE MODULE: Finance router ready with endpoints ===")
