from fastapi import APIRouter, HTTPException, Body, Request
from postgreSQL.database import DatabaseInterface
from postgreSQL.admin.activity_log import log_admin_activity
from typing import Dict, Any

router = APIRouter()

@router.get("/admin/referral-settings")
def get_referral_settings():
    # For demo, just return a static dict or fetch from DB if exists
    query = "SELECT * FROM referral_settings LIMIT 1"
    result = DatabaseInterface.execute_query(query)
    if result:
        return result[0]
    # Defaults
    return {
        "tier1_commission": 20,
        "tier2_commission": 10,
        "cookie_duration": 30,
        "auto_approve": True,
        "payout_frequency": "monthly",
        "attribution_method": "first_click",
        "preferred_payout": "paypal",
        "payout_notes": "For manual payouts, please ensure all affiliate information is complete and verified."
    }

@router.post("/admin/referral-settings")
def save_referral_settings(request: Request, data: Dict[str, Any] = Body(...)):
    # Upsert logic
    query = """
        INSERT INTO referral_settings (
            tier1_commission, tier2_commission, cookie_duration, auto_approve, payout_frequency, attribution_method, preferred_payout, payout_notes, updated_at
        ) VALUES (
            %(tier1_commission)s, %(tier2_commission)s, %(cookie_duration)s, %(auto_approve)s, %(payout_frequency)s, %(attribution_method)s, %(preferred_payout)s, %(payout_notes)s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            tier1_commission = EXCLUDED.tier1_commission,
            tier2_commission = EXCLUDED.tier2_commission,
            cookie_duration = EXCLUDED.cookie_duration,
            auto_approve = EXCLUDED.auto_approve,
            payout_frequency = EXCLUDED.payout_frequency,
            attribution_method = EXCLUDED.attribution_method,
            preferred_payout = EXCLUDED.preferred_payout,
            payout_notes = EXCLUDED.payout_notes,
            updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, data)
    # Log admin activity
    admin_id = getattr(getattr(request.state, "user", None), "id", None)
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    log_admin_activity(
        event_type='update_referral_settings',
        performed_by=admin_id,
        details='Updated referral settings',
        ip_address=ip_address,
        user_agent=user_agent
    )
    return {"success": True}
