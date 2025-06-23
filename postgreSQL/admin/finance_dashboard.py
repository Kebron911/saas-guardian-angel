
from typing import Dict, Any, List
from datetime import datetime, timedelta
from postgreSQL.database import DatabaseInterface
from fastapi import APIRouter, HTTPException
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Create the router instance
router = APIRouter()

def get_monthly_revenue() -> Dict[str, Any]:
    """Get current month's revenue from completed transactions"""
    try:
        logger.debug("Fetching monthly revenue from PostgreSQL")
        
        query = """
        SELECT 
            COALESCE(SUM(t.amount), 0) as monthly_revenue,
            COUNT(*) as transaction_count
        FROM transactions t
        WHERE t.status = 'completed'
            AND t.created_at >= date_trunc('month', CURRENT_DATE)
            AND t.created_at < date_trunc('month', CURRENT_DATE) + interval '1 month'
        """
        
        result = DatabaseInterface.execute_query(query)
        
        if result:
            return {
                "monthly_revenue": float(result[0]["monthly_revenue"]),
                "transaction_count": result[0]["transaction_count"]
            }
        
        return {"monthly_revenue": 0, "transaction_count": 0}
        
    except Exception as e:
        logger.error(f"Error fetching monthly revenue: {e}")
        return {"monthly_revenue": 0, "transaction_count": 0}

def get_active_subscriptions_count() -> Dict[str, Any]:
    """Get count of active subscriptions"""
    try:
        logger.debug("Fetching active subscriptions count from PostgreSQL")
        
        query = """
        SELECT 
            COUNT(*) as active_count
        FROM active_subscriptions
        WHERE status = 'active'
            AND deleted_at IS NULL
        """
        
        result = DatabaseInterface.execute_query(query)
        
        if result:
            return {"active_subscriptions": result[0]["active_count"]}
        
        return {"active_subscriptions": 0}
        
    except Exception as e:
        logger.error(f"Error fetching active subscriptions: {e}")
        return {"active_subscriptions": 0}

def get_promo_usage_count() -> Dict[str, Any]:
    """Get current month's promo code usage count"""
    try:
        logger.debug("Fetching promo usage count from PostgreSQL")
        
        query = """
        SELECT 
            COUNT(*) as usage_count
        FROM promo_usages
        WHERE used_at >= date_trunc('month', CURRENT_DATE)
            AND used_at < date_trunc('month', CURRENT_DATE) + interval '1 month'
        """
        
        result = DatabaseInterface.execute_query(query)
        
        if result:
            return {"promo_usage": result[0]["usage_count"]}
        
        return {"promo_usage": 0}
        
    except Exception as e:
        logger.error(f"Error fetching promo usage: {e}")
        return {"promo_usage": 0}

def get_total_payouts() -> Dict[str, Any]:
    """Get total amount of completed payouts"""
    try:
        logger.debug("Fetching total payouts from PostgreSQL")
        
        query = """
        SELECT 
            COALESCE(SUM(amount), 0) as total_payouts,
            COUNT(*) as payout_count
        FROM payouts
        WHERE status = 'paid'
        """
        
        result = DatabaseInterface.execute_query(query)
        
        if result:
            return {
                "total_payouts": float(result[0]["total_payouts"]),
                "payout_count": result[0]["payout_count"]
            }
        
        return {"total_payouts": 0, "payout_count": 0}
        
    except Exception as e:
        logger.error(f"Error fetching total payouts: {e}")
        return {"total_payouts": 0, "payout_count": 0}

def get_revenue_timeline() -> List[Dict[str, Any]]:
    """Get revenue timeline for the last 12 months"""
    try:
        logger.debug("Fetching revenue timeline from PostgreSQL")
        
        query = """
        SELECT 
            DATE_TRUNC('month', t.created_at) as month,
            SUM(t.amount) as revenue
        FROM transactions t
        WHERE t.status = 'completed'
            AND t.created_at >= CURRENT_DATE - interval '12 months'
        GROUP BY DATE_TRUNC('month', t.created_at)
        ORDER BY month
        """
        
        result = DatabaseInterface.execute_query(query)
        
        timeline_data = []
        for row in result:
            month_name = row["month"].strftime("%b %Y")
            timeline_data.append({
                "name": month_name,
                "revenue": float(row["revenue"])
            })
        
        return timeline_data
        
    except Exception as e:
        logger.error(f"Error fetching revenue timeline: {e}")
        return []

def get_revenue_by_plan() -> List[Dict[str, Any]]:
    """Get revenue breakdown by plan"""
    try:
        logger.debug("Fetching revenue by plan from PostgreSQL")
        
        query = """
        SELECT 
            p.name as plan_name,
            SUM(bh.amount) as revenue,
            COUNT(bh.invoice_id) as invoice_count
        FROM billing_history bh
        JOIN plans p ON bh.plan_id = p.id
        WHERE bh.status = 'paid'
        GROUP BY p.id, p.name
        ORDER BY revenue DESC
        """
        
        result = DatabaseInterface.execute_query(query)
        
        plan_data = []
        for row in result:
            plan_data.append({
                "name": row["plan_name"],
                "revenue": float(row["revenue"]),
                "invoice_count": row["invoice_count"]
            })
        
        return plan_data
        
    except Exception as e:
        logger.error(f"Error fetching revenue by plan: {e}")
        return []

# API ENDPOINTS
@router.get("/dashboard/monthly-revenue")
async def api_get_monthly_revenue():
    """API endpoint to get monthly revenue"""
    logger.info("=== API endpoint GET /admin/finance/dashboard/monthly-revenue called ===")
    try:
        result = get_monthly_revenue()
        logger.info(f"Successfully returning monthly revenue: {result}")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_monthly_revenue: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/active-subscriptions")
async def api_get_active_subscriptions():
    """API endpoint to get active subscriptions count"""
    logger.info("=== API endpoint GET /admin/finance/dashboard/active-subscriptions called ===")
    try:
        result = get_active_subscriptions_count()
        logger.info(f"Successfully returning active subscriptions: {result}")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_active_subscriptions: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/promo-usage")
async def api_get_promo_usage():
    """API endpoint to get promo usage count"""
    logger.info("=== API endpoint GET /admin/finance/dashboard/promo-usage called ===")
    try:
        result = get_promo_usage_count()
        logger.info(f"Successfully returning promo usage: {result}")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_promo_usage: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/total-payouts")
async def api_get_total_payouts():
    """API endpoint to get total payouts"""
    logger.info("=== API endpoint GET /admin/finance/dashboard/total-payouts called ===")
    try:
        result = get_total_payouts()
        logger.info(f"Successfully returning total payouts: {result}")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_total_payouts: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/revenue-timeline")
async def api_get_revenue_timeline():
    """API endpoint to get revenue timeline"""
    logger.info("=== API endpoint GET /admin/finance/dashboard/revenue-timeline called ===")
    try:
        result = get_revenue_timeline()
        logger.info(f"Successfully returning revenue timeline with {len(result)} data points")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_revenue_timeline: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/revenue-by-plan")
async def api_get_revenue_by_plan():
    """API endpoint to get revenue by plan"""
    logger.info("=== API endpoint GET /admin/finance/dashboard/revenue-by-plan called ===")
    try:
        result = get_revenue_by_plan()
        logger.info(f"Successfully returning revenue by plan with {len(result)} plans")
        return result
    except Exception as e:
        logger.error(f"Error in api_get_revenue_by_plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

logger.info("=== FINANCE DASHBOARD MODULE: Finance dashboard router ready with endpoints ===")
