from fastapi import APIRouter, HTTPException, Body, Request
from postgreSQL.database import DatabaseInterface
from postgreSQL.admin.activity_log import log_admin_activity
from typing import Dict, Any

router = APIRouter()

@router.get("/admin/email-settings")
def get_email_settings():
    query = "SELECT * FROM email_settings LIMIT 1"
    result = DatabaseInterface.execute_query(query)
    if result:
        return result[0]
    # Defaults
    return {
        "from_name": "Professional AI Assistants",
        "from_email": "no-reply@aiassistants.com",
        "smtp_host": "smtp.example.com",
        "smtp_port": 587,
        "smtp_username": "smtp_user@example.com",
        "smtp_password": "",
        "encryption_type": "tls"
    }

@router.post("/admin/email-settings")
def save_email_settings(request: Request, data: Dict[str, Any] = Body(...)):
    query = """
        INSERT INTO email_settings (
            from_name, from_email, smtp_host, smtp_port, smtp_username, smtp_password, encryption_type, updated_at
        ) VALUES (
            %(from_name)s, %(from_email)s, %(smtp_host)s, %(smtp_port)s, %(smtp_username)s, %(smtp_password)s, %(encryption_type)s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            from_name = EXCLUDED.from_name,
            from_email = EXCLUDED.from_email,
            smtp_host = EXCLUDED.smtp_host,
            smtp_port = EXCLUDED.smtp_port,
            smtp_username = EXCLUDED.smtp_username,
            smtp_password = EXCLUDED.smtp_password,
            encryption_type = EXCLUDED.encryption_type,
            updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, data)
    # Log admin activity
    admin_id = getattr(getattr(request.state, "user", None), "id", None)
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    log_admin_activity(
        event_type='update_email_settings',
        performed_by=admin_id,
        details='Updated email settings',
        ip_address=ip_address,
        user_agent=user_agent
    )
    return {"success": True}
