
from fastapi import APIRouter, HTTPException
from postgreSQL.database import DatabaseInterface
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Any

logger = logging.getLogger(__name__)
router = APIRouter()

@router.get("/dashboard-stats")
async def get_dashboard_stats():
    """Get admin dashboard statistics"""
    try:
        # Total Users (excluding soft-deleted)
        total_users_query = """
            SELECT COUNT(*) as count 
            FROM users 
            WHERE deleted_at IS NULL
        """
        total_users_result = DatabaseInterface.execute_query(total_users_query)
        total_users = total_users_result[0]['count'] if total_users_result else 0

        # Total Affiliates
        total_affiliates_query = """
            SELECT COUNT(*) as count 
            FROM affiliates
        """
        total_affiliates_result = DatabaseInterface.execute_query(total_affiliates_query)
        total_affiliates = total_affiliates_result[0]['count'] if total_affiliates_result else 0

        # Active Subscriptions
        active_subscriptions_query = """
            SELECT COUNT(*) as count 
            FROM subscriptions 
            WHERE status = 'active' AND deleted_at IS NULL
        """
        active_subscriptions_result = DatabaseInterface.execute_query(active_subscriptions_query)
        active_subscriptions = active_subscriptions_result[0]['count'] if active_subscriptions_result else 0

        # Monthly Revenue (current month)
        monthly_revenue_query = """
            SELECT COALESCE(SUM(amount), 0) as revenue
            FROM transactions 
            WHERE status = 'completed' 
            AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
            AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        """
        monthly_revenue_result = DatabaseInterface.execute_query(monthly_revenue_query)
        monthly_revenue = float(monthly_revenue_result[0]['revenue']) if monthly_revenue_result else 0.0

        # Commissions Paid (total)
        commissions_paid_query = """
            SELECT COALESCE(SUM(commission_amount), 0) as total_commissions
            FROM referrals 
            WHERE status = 'converted'
        """
        commissions_paid_result = DatabaseInterface.execute_query(commissions_paid_query)
        commissions_paid = float(commissions_paid_result[0]['total_commissions']) if commissions_paid_result else 0.0

        # Open Support Tickets
        open_tickets_query = """
            SELECT COUNT(*) as count 
            FROM support_tickets 
            WHERE status IN ('open', 'pending')
        """
        open_tickets_result = DatabaseInterface.execute_query(open_tickets_query)
        open_tickets = open_tickets_result[0]['count'] if open_tickets_result else 0

        return {
            "total_users": total_users,
            "total_affiliates": total_affiliates,
            "active_subscriptions": active_subscriptions,
            "monthly_revenue": monthly_revenue,
            "commissions_paid": commissions_paid,
            "open_tickets": open_tickets
        }

    except Exception as e:
        logger.error(f"Error fetching dashboard stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/revenue-chart")
async def get_revenue_chart_data():
    """Get revenue data for the last 6 months"""
    try:
        revenue_query = """
            SELECT 
                TO_CHAR(created_at, 'Mon YYYY') as name,
                COALESCE(SUM(amount), 0) as revenue
            FROM transactions 
            WHERE status = 'completed' 
            AND created_at >= CURRENT_DATE - INTERVAL '6 months'
            GROUP BY DATE_TRUNC('month', created_at), TO_CHAR(created_at, 'Mon YYYY')
            ORDER BY DATE_TRUNC('month', created_at)
        """
        
        result = DatabaseInterface.execute_query(revenue_query)
        
        # Ensure we have data for the last 6 months, fill with 0 if missing
        revenue_data = []
        for row in result:
            revenue_data.append({
                "name": row['name'],
                "revenue": float(row['revenue'])
            })
        
        # If no data, create sample months with 0 revenue
        if not revenue_data:
            import calendar
            now = datetime.now()
            for i in range(6):
                month_date = now - timedelta(days=30*i)
                month_name = month_date.strftime('%b %Y')
                revenue_data.insert(0, {"name": month_name, "revenue": 0})
        
        return revenue_data

    except Exception as e:
        logger.error(f"Error fetching revenue chart data: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/subscription-chart")
async def get_subscription_chart_data():
    """Get subscription distribution by plan"""
    try:
        subscription_query = """
            SELECT 
                p.name,
                COUNT(s.id) as value,
                CASE 
                    WHEN p.name ILIKE '%basic%' THEN '#3B82F6'
                    WHEN p.name ILIKE '%pro%' THEN '#10B981'
                    WHEN p.name ILIKE '%premium%' THEN '#8B5CF6'
                    ELSE '#F59E0B'
                END as color
            FROM plans p
            LEFT JOIN subscriptions s ON p.id = s.plan_id 
                AND s.status = 'active' 
                AND s.deleted_at IS NULL
            WHERE p.status = 'active'
            GROUP BY p.id, p.name
            ORDER BY value DESC
        """
        
        result = DatabaseInterface.execute_query(subscription_query)
        
        subscription_data = []
        for row in result:
            subscription_data.append({
                "name": row['name'],
                "value": row['value'],
                "color": row['color']
            })
        
        # If no data, create sample data
        if not subscription_data:
            subscription_data = [
                {"name": "Basic", "value": 0, "color": "#3B82F6"},
                {"name": "Pro", "value": 0, "color": "#10B981"},
                {"name": "Premium", "value": 0, "color": "#8B5CF6"}
            ]
        
        return subscription_data

    except Exception as e:
        logger.error(f"Error fetching subscription chart data: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/admin-activity")
async def get_admin_activity():
    """Get recent admin activity"""
    try:
        activity_query = """
            SELECT 
                a.id,
                a.event_type,
                COALESCE(u.email, 'System') as performed_by_email,
                a.details,
                a.created_at as timestamp,
                a.ip_address
            FROM admin_activity_log a
            LEFT JOIN users u ON a.performed_by = u.id
            ORDER BY a.created_at DESC
            LIMIT 10
        """
        
        result = DatabaseInterface.execute_query(activity_query)
        
        activity_data = []
        for row in result:
            activity_data.append({
                "id": str(row['id']),
                "event_type": row['event_type'],
                "performed_by_email": row['performed_by_email'],
                "details": row['details'] or '',
                "timestamp": row['timestamp'].isoformat() if row['timestamp'] else '',
                "ip_address": row['ip_address'] or ''
            })
        
        return activity_data

    except Exception as e:
        logger.error(f"Error fetching admin activity: {e}")
        raise HTTPException(status_code=500, detail=str(e))
