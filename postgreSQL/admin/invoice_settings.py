from fastapi import APIRouter, HTTPException, Body, Request
from postgreSQL.database import DatabaseInterface
from postgreSQL.admin.activity_log import log_admin_activity
from typing import Dict, Any

router = APIRouter()

@router.get("/admin/invoice-settings")
def get_invoice_settings():
    query = "SELECT * FROM invoice_settings LIMIT 1"
    result = DatabaseInterface.execute_query(query)
    if result:
        return result[0]
    # Defaults
    return {
        "company_name": "AI Assistants, Inc.",
        "company_address": "123 Main Street, Suite 100, San Francisco, CA 94105, United States",
        "tax_id": "US 123456789",
        "invoice_prefix": "INV-",
        "footer_notes": "Thank you for your business. Payment terms: Due upon receipt.",
        "auto_invoice": True,
        "invoice_logo": ""
    }

@router.post("/admin/invoice-settings")
def save_invoice_settings(request: Request, data: Dict[str, Any] = Body(...)):
    query = """
        INSERT INTO invoice_settings (
            company_name, company_address, tax_id, invoice_prefix, footer_notes, auto_invoice, invoice_logo, updated_at
        ) VALUES (
            %(company_name)s, %(company_address)s, %(tax_id)s, %(invoice_prefix)s, %(footer_notes)s, %(auto_invoice)s, %(invoice_logo)s, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            company_name = EXCLUDED.company_name,
            company_address = EXCLUDED.company_address,
            tax_id = EXCLUDED.tax_id,
            invoice_prefix = EXCLUDED.invoice_prefix,
            footer_notes = EXCLUDED.footer_notes,
            auto_invoice = EXCLUDED.auto_invoice,
            invoice_logo = EXCLUDED.invoice_logo,
            updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, data)
    # Log admin activity
    admin_id = getattr(getattr(request.state, "user", None), "id", None)
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    log_admin_activity(
        event_type='update_invoice_settings',
        performed_by=admin_id,
        details='Updated invoice settings',
        ip_address=ip_address,
        user_agent=user_agent
    )
    return {"success": True}
