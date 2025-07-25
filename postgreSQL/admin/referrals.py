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

# Add debug logging to confirm the module is being loaded
logger.info("=== REFERRALS MODULE: Starting to load referrals router module ===")

class AffiliateCreate(BaseModel):
    user_id: str
    referral_code: Optional[str] = None
    commission_rate: Optional[float] = 0.15

class AffiliateUpdate(BaseModel):
    referral_code: Optional[str] = None
    commission_rate: Optional[float] = None

class ReferralPayoutCreate(BaseModel):
    affiliate_id: str
    amount: float
    status: str
    payment_method: Optional[str] = None
    referral_count: Optional[int] = 0
    notes: Optional[str] = None

class ReferralPayoutUpdate(BaseModel):
    status: Optional[str] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None

def get_all_affiliates(search: str = None) -> List[Dict[str, Any]]:
    """Get all affiliates from the database with optional search"""
    try:
        logger.debug("Fetching all affiliates from PostgreSQL")
        # Query affiliates table with joins to get user info and stats
        query = """
        SELECT 
            a.id,
            a.user_id,
            COALESCE(up.first_name || ' ' || up.last_name, 'Unknown User') as name,
            COALESCE(up.email, 'No email') as email,
            a.referral_code,
            a.commission_rate,
            COUNT(r.id) as total_referrals,
            COALESCE(SUM(r.commission_amount), 0) as total_earnings,
            a.created_at,
            a.updated_at
        FROM affiliates a
        LEFT JOIN user_profiles up ON a.user_id = up.user_id
        LEFT JOIN referrals r ON a.id = r.affiliate_id AND r.status = 'converted'
        GROUP BY a.id, a.user_id, up.first_name, up.last_name, up.email, a.referral_code, a.commission_rate, a.created_at, a.updated_at
        ORDER BY a.created_at DESC
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
                referral_code,
                commission_rate,
                created_at,
                updated_at
            FROM affiliates
            ORDER BY created_at DESC
            """
            result = DatabaseInterface.execute_query(simple_query)
            # Add default values for missing fields
            for row in result:
                row['name'] = f"User {row['user_id'][:8]}"
                row['email'] = 'email@example.com'
                row['total_referrals'] = 0
                row['total_earnings'] = 0
        # Apply search filter if provided
        if search and result:
            search_lower = search.lower()
            result = [
                aff for aff in result
                if search_lower in str(aff.get("name", "")).lower() or 
                   search_lower in str(aff.get("email", "")).lower() or
                   search_lower in str(aff.get("referral_code", "")).lower()
            ]
        logger.debug(f"Affiliates result: {len(result)} affiliates found")
        return result
    except Exception as e:
        logger.error(f"Error fetching affiliates: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_all_referral_payouts(status_filter: str = None, search: str = None) -> List[Dict[str, Any]]:
    """Get all referral payouts from the database with optional filters"""
    try:
        logger.debug("Fetching all referral payouts from PostgreSQL")
        
        # Query referral_payouts table with affiliate info
        query = """
        SELECT 
            rp.id,
            rp.affiliate_id,
            COALESCE(up.first_name || ' ' || up.last_name, 'Unknown User') as affiliate_name,
            COALESCE(up.email, 'No email') as email,
            a.referral_code,
            rp.amount,
            rp.status,
            rp.payment_method,
            rp.referral_count,
            rp.notes,
            rp.created_at,
            rp.updated_at
        FROM referral_payouts rp
        LEFT JOIN affiliates a ON rp.affiliate_id = a.id
        LEFT JOIN user_profiles up ON a.user_id = up.user_id
        ORDER BY rp.created_at DESC
        """
        
        try:
            result = DatabaseInterface.execute_query(query)
        except Exception as db_error:
            logger.warning(f"Database query failed, trying simplified query: {db_error}")
            # Fallback to simpler query if joins fail
            simple_query = """
            SELECT 
                id,
                affiliate_id,
                amount,
                status,
                payment_method,
                referral_count,
                notes,
                created_at,
                updated_at
            FROM referral_payouts
            ORDER BY created_at DESC
            """
            result = DatabaseInterface.execute_query(simple_query)
            
            # Add default values for missing fields
            for row in result:
                row['affiliate_name'] = f"Affiliate {row['affiliate_id'][:8]}"
                row['email'] = 'email@example.com'
                row['referral_code'] = 'CODE'
        
        # Apply filters
        if status_filter and status_filter != 'all-status' and result:
            result = [p for p in result if p["status"] == status_filter]
        
        if search and result:
            search_lower = search.lower()
            result = [
                p for p in result
                if search_lower in str(p.get("affiliate_name", "")).lower() or 
                   search_lower in str(p.get("email", "")).lower()
            ]
        
        logger.debug(f"Referral payouts result: {len(result)} payouts found")
        return result
        
    except Exception as e:
        logger.error(f"Error fetching referral payouts: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

def get_referral_stats() -> Dict[str, Any]:
    """Get referral program statistics from the database"""
    try:
        logger.debug("Fetching referral statistics from PostgreSQL")
        
        # Get total affiliates
        affiliates_query = "SELECT COUNT(*) as count FROM affiliates"
        affiliates_result = DatabaseInterface.execute_query(affiliates_query)
        total_affiliates = affiliates_result[0]['count'] if affiliates_result else 0
        
        # Get total referrals
        referrals_query = "SELECT COUNT(*) as count FROM referrals"
        referrals_result = DatabaseInterface.execute_query(referrals_query)
        total_referrals = referrals_result[0]['count'] if referrals_result else 0
        
        # Get total revenue (sum of all payouts)
        revenue_query = "SELECT COALESCE(SUM(amount), 0) as total FROM payouts"
        revenue_result = DatabaseInterface.execute_query(revenue_query)
        total_revenue = float(revenue_result[0]['total']) if revenue_result else 0
        
        # Get total commissions (sum of all referral payouts)
        commissions_query = "SELECT COALESCE(SUM(amount), 0) as total FROM referral_payouts"
        commissions_result = DatabaseInterface.execute_query(commissions_query)
        total_commissions = float(commissions_result[0]['total']) if commissions_result else 0
        
        stats = {
            "total_affiliates": total_affiliates,
            "total_referrals": total_referrals,
            "total_revenue": total_revenue,
            "total_commissions": total_commissions
        }
        
        logger.debug(f"Referral stats: {stats}")
        return stats
        
    except Exception as e:
        logger.error(f"Error fetching referral stats: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# API ENDPOINTS
@router.get("/affiliates")
async def api_get_affiliates(search: Optional[str] = Query(None)):
    """API endpoint to get all affiliates with optional search"""
    logger.info("=== API endpoint GET /admin/affiliates called ===")
    try:
        result = get_all_affiliates(search)
        logger.info(f"Successfully returning {len(result)} affiliates")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_affiliates: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/referral-payouts")
async def api_get_referral_payouts(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """API endpoint to get all referral payouts with optional filters"""
    logger.info("=== API endpoint GET /admin/referral-payouts called ===")
    try:
        result = get_all_referral_payouts(status, search)
        logger.info(f"Successfully returning {len(result)} referral payouts")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_referral_payouts: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/referral-stats")
async def api_get_referral_stats():
    """API endpoint to get referral program statistics"""
    logger.info("=== API endpoint GET /admin/referral-stats called ===")
    try:
        result = get_referral_stats()
        logger.info("Successfully returning referral stats")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_referral_stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/referral-payouts/{payout_id}")
async def api_update_referral_payout(payout_id: str, updates: ReferralPayoutUpdate):
    """API endpoint to update a referral payout"""
    logger.info(f"=== API endpoint PUT /admin/referral-payouts/{payout_id} called ===")
    try:
        logger.info(f"Updating referral payout {payout_id} with status: {updates.status}")
        
        # Build update data
        update_data = {}
        if updates.status is not None:
            update_data['status'] = updates.status
        if updates.payment_method is not None:
            update_data['payment_method'] = updates.payment_method
        if updates.notes is not None:
            update_data['notes'] = updates.notes
        
        if update_data:
            update_data['updated_at'] = datetime.now()
            DatabaseInterface.update('referral_payouts', update_data, {'id': payout_id})
        
        return {"message": "Referral payout updated successfully", "payout_id": payout_id}
    except Exception as e:
        logger.error(f"Error updating referral payout: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Add a test endpoint to verify the router is working
@router.get("/test")
async def test_referrals_router():
    """Test endpoint to verify referrals router is working"""
    logger.info("=== Test referrals router endpoint called ===")
    return {"message": "Referrals router is working correctly"}

# Add debug logging to confirm router is ready
logger.info("=== REFERRALS MODULE: Referrals router ready with endpoints: /affiliates, /referral-payouts, /referral-stats, /test ===")

# Export the router explicitly
__all__ = ['router']
