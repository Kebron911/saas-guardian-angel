from fastapi import APIRouter, HTTPException, Body, Request
from postgreSQL.database import DatabaseInterface
from typing import Dict, Any
from postgreSQL.admin.activity_log import log_admin_activity

router = APIRouter()

@router.get("/admin/system-settings")
def get_system_settings():
    query = "SELECT * FROM system_settings LIMIT 1"
    result = DatabaseInterface.execute_query(query)
    if result:
        return result[0]
    # Defaults
    return {
        "app_version": "v2.5.0",
        "enable_logging": True,
        "api_rate_limit": 60,
        "allowed_ips": "",
        "custom_code": ""
    }

@router.post("/admin/system-settings")
def save_system_settings(request: Request, data: Dict[str, Any] = Body(...)):
    query = """
        INSERT INTO system_settings (
            app_version, enable_logging, api_rate_limit, allowed_ips, custom_code, updated_at
        ) VALUES (
            %(app_version)s, %(enable_logging)s, %(api_rate_limit)s, %(allowed_ips)s, %(custom_code)s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            app_version = EXCLUDED.app_version,
            enable_logging = EXCLUDED.enable_logging,
            api_rate_limit = EXCLUDED.api_rate_limit,
            allowed_ips = EXCLUDED.allowed_ips,
            custom_code = EXCLUDED.custom_code,
            updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, data)
    # Log admin activity
    admin_id = getattr(getattr(request.state, "user", None), "id", None)
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    log_admin_activity(
        event_type='update_system_settings',
        performed_by=admin_id,
        details='Updated system settings',
        ip_address=ip_address,
        user_agent=user_agent
    )
    return {"success": True}
