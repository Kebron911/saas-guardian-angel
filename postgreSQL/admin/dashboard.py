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
            WHERE status = 'succeeded' 
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

        # Promo Usage (current month)
        promo_usage_query = """
            SELECT COUNT(*) as count
            FROM promo_usages
            WHERE EXTRACT(YEAR FROM used_at) = EXTRACT(YEAR FROM CURRENT_DATE)
            AND EXTRACT(MONTH FROM used_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        """
        promo_usage_result = DatabaseInterface.execute_query(promo_usage_query)
        promo_usage = promo_usage_result[0]['count'] if promo_usage_result else 0

        # Promo Usage (all time)
        promo_usage_total_query = """
            SELECT COUNT(*) as count FROM promo_usages
        """
        promo_usage_total_result = DatabaseInterface.execute_query(promo_usage_total_query)
        promo_usage_total = promo_usage_total_result[0]['count'] if promo_usage_total_result else 0

        # Breakdown of new active subscriptions
        breakdown_queries = {
            "today": """
                SELECT COUNT(*) as count FROM subscriptions
                WHERE status = 'active' AND deleted_at IS NULL
                AND created_at >= date_trunc('day', CURRENT_DATE)
            """,
            "week": """
                SELECT COUNT(*) as count FROM subscriptions
                WHERE status = 'active' AND deleted_at IS NULL
                AND created_at >= date_trunc('week', CURRENT_DATE)
            """,
            "month": """
                SELECT COUNT(*) as count FROM subscriptions
                WHERE status = 'active' AND deleted_at IS NULL
                AND created_at >= date_trunc('month', CURRENT_DATE)
            """,
            "year": """
                SELECT COUNT(*) as count FROM subscriptions
                WHERE status = 'active' AND deleted_at IS NULL
                AND created_at >= date_trunc('year', CURRENT_DATE)
            """
        }
        active_subscriptions_breakdown = {}
        for key, query in breakdown_queries.items():
            result = DatabaseInterface.execute_query(query)
            active_subscriptions_breakdown[key] = result[0]['count'] if result else 0

        # Breakdown of new promo usages
        promo_breakdown_queries = {
            "today": """
                SELECT COUNT(*) as count FROM promo_usages
                WHERE used_at >= date_trunc('day', CURRENT_DATE)
            """,
            "week": """
                SELECT COUNT(*) as count FROM promo_usages
                WHERE used_at >= date_trunc('week', CURRENT_DATE)
            """,
            "month": """
                SELECT COUNT(*) as count FROM promo_usages
                WHERE used_at >= date_trunc('month', CURRENT_DATE)
            """,
            "year": """
                SELECT COUNT(*) as count FROM promo_usages
                WHERE used_at >= date_trunc('year', CURRENT_DATE)
            """
        }
        promo_usage_breakdown = {}
        for key, query in promo_breakdown_queries.items():
            result = DatabaseInterface.execute_query(query)
            promo_usage_breakdown[key] = result[0]['count'] if result else 0

        # Breakdown of new affiliates
        affiliates_breakdown_queries = {
            "today": """
                SELECT COUNT(*) as count FROM affiliates
                WHERE created_at >= date_trunc('day', CURRENT_DATE)
            """,
            "week": """
                SELECT COUNT(*) as count FROM affiliates
                WHERE created_at >= date_trunc('week', CURRENT_DATE)
            """,
            "month": """
                SELECT COUNT(*) as count FROM affiliates
                WHERE created_at >= date_trunc('month', CURRENT_DATE)
            """,
            "year": """
                SELECT COUNT(*) as count FROM affiliates
                WHERE created_at >= date_trunc('year', CURRENT_DATE)
            """
        }
        affiliates_breakdown = {}
        for key, query in affiliates_breakdown_queries.items():
            result = DatabaseInterface.execute_query(query)
            affiliates_breakdown[key] = result[0]['count'] if result else 0

        # Total Referrals
        total_referrals_query = """
            SELECT COUNT(*) as count FROM referrals
        """
        total_referrals_result = DatabaseInterface.execute_query(total_referrals_query)
        total_referrals = total_referrals_result[0]['count'] if total_referrals_result else 0

        # Breakdown of new referrals
        referrals_breakdown_queries = {
            "today": """
                SELECT COUNT(*) as count FROM referrals
                WHERE created_at >= date_trunc('day', CURRENT_DATE)
            """,
            "week": """
                SELECT COUNT(*) as count FROM referrals
                WHERE created_at >= date_trunc('week', CURRENT_DATE)
            """,
            "month": """
                SELECT COUNT(*) as count FROM referrals
                WHERE created_at >= date_trunc('month', CURRENT_DATE)
            """,
            "year": """
                SELECT COUNT(*) as count FROM referrals
                WHERE created_at >= date_trunc('year', CURRENT_DATE)
            """
        }
        referrals_breakdown = {}
        for key, query in referrals_breakdown_queries.items():
            result = DatabaseInterface.execute_query(query)
            referrals_breakdown[key] = result[0]['count'] if result else 0

        # Total Revenue (all time)
        total_revenue_query = """
            SELECT COALESCE(SUM(amount), 0) as revenue
            FROM transactions
            WHERE status = 'succeeded'
        """
        total_revenue_result = DatabaseInterface.execute_query(total_revenue_query)
        total_revenue = float(total_revenue_result[0]['revenue']) if total_revenue_result else 0.0

        # Total Commissions Paid (all time)
        total_commissions_query = """
            SELECT COALESCE(SUM(commission_amount), 0) as total_commissions
            FROM referrals
            WHERE status = 'converted'
        """
        total_commissions_result = DatabaseInterface.execute_query(total_commissions_query)
        total_commissions = float(total_commissions_result[0]['total_commissions']) if total_commissions_result else 0.0

        return {
            "total_users": total_users,
            "total_affiliates": total_affiliates,
            "active_subscriptions": active_subscriptions,
            "active_subscriptions_breakdown": active_subscriptions_breakdown,
            "monthly_revenue": monthly_revenue,
            "commissions_paid": commissions_paid,
            "open_tickets": open_tickets,
            "promo_usage": promo_usage_total,
            "promo_usage_breakdown": promo_usage_breakdown,
            "affiliates_breakdown": affiliates_breakdown,
            "total_referrals": total_referrals,
            "referrals_breakdown": referrals_breakdown,
            "total_revenue": total_revenue,
            "total_commissions": total_commissions
        }

    except Exception as e:
        logger.error(f"Error fetching dashboard stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/revenue-chart")
async def get_revenue_chart_data():
    """Get revenue data for the last 12 months"""
    try:
        revenue_query = """
            SELECT 
                TO_CHAR(created_at, 'Mon YYYY') as name,
                COALESCE(SUM(amount), 0) as revenue
            FROM transactions 
            WHERE status = 'succeeded' 
            AND created_at >= CURRENT_DATE - INTERVAL '12 months'
            GROUP BY DATE_TRUNC('month', created_at), TO_CHAR(created_at, 'Mon YYYY')
            ORDER BY DATE_TRUNC('month', created_at)
        """
        
        result = DatabaseInterface.execute_query(revenue_query)
        # Build a dict for quick lookup
        revenue_dict = {row['name']: float(row['revenue']) for row in result}

        # Generate last 12 months labels
        now = datetime.now()
        months = []
        for i in range(11, -1, -1):
            month = (now.replace(day=1) - timedelta(days=30*i))
            label = month.strftime('%b %Y')
            months.append(label)

        # Fill with 0 if missing
        revenue_data = []
        for label in months:
            revenue_data.append({
                "name": label,
                "revenue": revenue_dict.get(label, 0.0)
            })

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
                a.ip_address,
                a.user_agent
            FROM admin_activity_log a
            LEFT JOIN users u ON a.performed_by = u.id
            ORDER BY a.created_at DESC
            LIMIT 20
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
                "ip_address": row['ip_address'] or '',
                "user_agent": row.get('user_agent', '')
            })
        
        return activity_data

    except Exception as e:
        logger.error(f"Error fetching admin activity: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/revenue-by-plan")
async def get_revenue_by_plan():
    """Get total revenue grouped by plan name"""
    try:
        query = """
            SELECT p.name as plan, COALESCE(SUM(t.amount), 0) as revenue
            FROM transactions t
            JOIN billing_history b ON t.invoice_id = b.invoice_id
            JOIN plans p ON b.plan_id = p.id
            WHERE t.status = 'succeeded'
            GROUP BY p.name
            ORDER BY revenue DESC
        """
        result = DatabaseInterface.execute_query(query)
        return [{"plan": row["plan"], "revenue": float(row["revenue"])} for row in result]
    except Exception as e:
        logger.error(f"Error fetching revenue by plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/finance-stats")
async def get_finance_stats():
    """Get monthly revenue and percentage change from last month for finance dashboard"""
    try:
        # This month
        this_month_query = """
            SELECT COALESCE(SUM(amount), 0) as revenue
            FROM transactions
            WHERE status = 'succeeded'
            AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
            AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
        """
        this_month_result = DatabaseInterface.execute_query(this_month_query)
        this_month_revenue = float(this_month_result[0]['revenue']) if this_month_result else 0.0

        # Last month
        last_month_query = """
            SELECT COALESCE(SUM(amount), 0) as revenue
            FROM transactions
            WHERE status = 'succeeded'
            AND created_at >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
            AND created_at < date_trunc('month', CURRENT_DATE)
        """
        last_month_result = DatabaseInterface.execute_query(last_month_query)
        last_month_revenue = float(last_month_result[0]['revenue']) if last_month_result else 0.0

        # Calculate percentage change
        if last_month_revenue == 0:
            percent_change = 100.0 if this_month_revenue > 0 else 0.0
        else:
            percent_change = ((this_month_revenue - last_month_revenue) / last_month_revenue) * 100

        return {
            "monthly_revenue": this_month_revenue,
            "percent_change": percent_change
        }
    except Exception as e:
        logger.error(f"Error fetching finance stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/referrals-over-time")
async def get_referrals_over_time():
    """Get number of referrals per month for the last 12 months"""
    try:
        query = """
            SELECT TO_CHAR(created_at, 'Mon YYYY') as name, COUNT(*) as value
            FROM referrals
            WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
            GROUP BY DATE_TRUNC('month', created_at), TO_CHAR(created_at, 'Mon YYYY')
            ORDER BY DATE_TRUNC('month', created_at)
        """
        result = DatabaseInterface.execute_query(query)
        # Build a dict for quick lookup
        referrals_dict = {row['name']: row['value'] for row in result}
        # Generate last 12 months labels
        now = datetime.now()
        months = []
        for i in range(11, -1, -1):
            month = (now.replace(day=1) - timedelta(days=30*i))
            label = month.strftime('%b %Y')
            months.append(label)
        # Fill with 0 if missing
        data = []
        for label in months:
            data.append({"name": label, "value": referrals_dict.get(label, 0)})
        return data
    except Exception as e:
        logger.error(f"Error fetching referrals over time: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/top-affiliates")
async def get_top_affiliates():
    """Get top affiliates by number of successful referrals"""
    try:
        query = """
            SELECT a.id, COALESCE(up.first_name || ' ' || up.last_name, 'Unknown User') as name,
                   COALESCE(up.email, 'No email') as email, COUNT(r.id) as referrals
            FROM affiliates a
            LEFT JOIN user_profiles up ON a.user_id = up.user_id
            LEFT JOIN referrals r ON a.id = r.affiliate_id
            GROUP BY a.id, up.first_name, up.last_name, up.email
            ORDER BY referrals DESC, name ASC
            LIMIT 10
        """
        result = DatabaseInterface.execute_query(query)
        logger.info(f"Top affiliates API result: {result}")
        return [{
            "id": row["id"],
            "name": row["name"],
            "email": row["email"],
            "referrals": row["referrals"]
        } for row in result]
    except Exception as e:
        logger.error(f"Error fetching top affiliates: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/referral-conversion-rate")
async def get_referral_conversion_rate():
    """Get referral conversion rate (converted/total)"""
    try:
        total_query = "SELECT COUNT(*) as count FROM referrals"
        converted_query = "SELECT COUNT(*) as count FROM referrals WHERE status = 'converted'"
        total_result = DatabaseInterface.execute_query(total_query)
        converted_result = DatabaseInterface.execute_query(converted_query)
        total = total_result[0]['count'] if total_result else 0
        converted = converted_result[0]['count'] if converted_result else 0
        rate = (converted / total * 100) if total > 0 else 0.0
        return {"total": total, "converted": converted, "conversion_rate": rate}
    except Exception as e:
        logger.error(f"Error fetching referral conversion rate: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/commissions-over-time")
async def get_commissions_over_time():
    """Get commissions paid per month for the last 12 months"""
    try:
        query = """
            SELECT TO_CHAR(created_at, 'Mon YYYY') as name, COALESCE(SUM(commission_amount), 0) as value
            FROM referrals
            WHERE status = 'converted' AND created_at >= CURRENT_DATE - INTERVAL '12 months'
            GROUP BY DATE_TRUNC('month', created_at), TO_CHAR(created_at, 'Mon YYYY')
            ORDER BY DATE_TRUNC('month', created_at)
        """
        result = DatabaseInterface.execute_query(query)
        commissions_dict = {row['name']: float(row['value']) for row in result}
        now = datetime.now()
        months = []
        for i in range(11, -1, -1):
            month = (now.replace(day=1) - timedelta(days=30*i))
            label = month.strftime('%b %Y')
            months.append(label)
        data = []
        for label in months:
            data.append({"name": label, "value": commissions_dict.get(label, 0.0)})
        return data
    except Exception as e:
        logger.error(f"Error fetching commissions over time: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/affiliate/{affiliate_id}")
async def get_affiliate_details(affiliate_id: str):
    """Get full affiliate and user details by affiliate ID"""
    try:
        query = """
            SELECT a.id as affiliate_id, a.*, u.id as user_id, u.name as user_name, u.email as user_email, u.created_at as user_created_at, u.organization_id, u.subscription_status, u.current_period_end
            FROM affiliates a
            LEFT JOIN users u ON a.user_id = u.id
            WHERE a.id = %s
        """
        result = DatabaseInterface.execute_query(query, (affiliate_id,))
        if not result:
            raise HTTPException(status_code=404, detail="Affiliate not found")
        row = result[0]
        # Remove duplicate fields from affiliate
        affiliate_fields = {k: v for k, v in row.items() if k not in [
            "affiliate_id", "user_id", "user_name", "user_email", "user_created_at", "organization_id", "subscription_status", "current_period_end"
        ]}
        affiliate_fields["id"] = row["affiliate_id"]
        return {
            "affiliate": affiliate_fields,
            "user": {
                "id": row["user_id"],
                "name": row["user_name"],
                "email": row["user_email"],
                "created_at": row["user_created_at"],
                "organization_id": row["organization_id"],
                "subscription_status": row["subscription_status"],
                "current_period_end": row["current_period_end"]
            }
        }
    except Exception as e:
        logger.error(f"Error fetching affiliate details: {e}")
        raise HTTPException(status_code=500, detail=str(e))
