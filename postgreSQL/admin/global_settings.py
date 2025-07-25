from fastapi import APIRouter, HTTPException, Body, Request
from postgreSQL.database import DatabaseInterface
from typing import Dict, Any
from postgreSQL.admin.activity_log import log_admin_activity

router = APIRouter()

@router.get("/admin/global-settings")
def get_global_settings():
    query = "SELECT * FROM global_settings LIMIT 1"
    result = DatabaseInterface.execute_query(query)
    if result:
        return result[0]
    # Defaults
    return {
        "app_name": "Professional AI Assistants",
        "company_name": "AI Assistants, Inc.",
        "contact_email": "contact@aiassistants.com",
        "website_url": "https://aiassistants.com",
        "default_language": "en-US",
        "timezone": "America/New_York",
        "app_environment": "production",
        "default_role": "user",
        "maintenance_mode": False
    }

@router.post("/admin/global-settings")
def save_global_settings(request: Request, data: Dict[str, Any] = Body(...)):
    query = """
        INSERT INTO global_settings (
            app_name, company_name, contact_email, website_url, default_language, timezone, app_environment, default_role, maintenance_mode, updated_at
        ) VALUES (
            %(app_name)s, %(company_name)s, %(contact_email)s, %(website_url)s, %(default_language)s, %(timezone)s, %(app_environment)s, %(default_role)s, %(maintenance_mode)s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            app_name = EXCLUDED.app_name,
            company_name = EXCLUDED.company_name,
            contact_email = EXCLUDED.contact_email,
            website_url = EXCLUDED.website_url,
            default_language = EXCLUDED.default_language,
            timezone = EXCLUDED.timezone,
            app_environment = EXCLUDED.app_environment,
            default_role = EXCLUDED.default_role,
            maintenance_mode = EXCLUDED.maintenance_mode,
            updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, data)
    # Log admin activity
    admin_id = getattr(getattr(request.state, "user", None), "id", None)
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    log_admin_activity(
        event_type='update_global_settings',
        performed_by=admin_id,
        details='Updated global settings',
        ip_address=ip_address,
        user_agent=user_agent
    )
    return {"success": True}
