from typing import List, Dict, Any, Optional
from datetime import datetime
from database import DatabaseInterface
from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel

router = APIRouter()

class BillingRecordCreate(BaseModel):
    user_id: str
    plan_id: str
    amount: float
    status: str = "pending"
    payment_method: str = None
    due_date: datetime = None
    notes: str = None

class BillingHistory:
    @staticmethod
    def insert_billing_record(user_id: str, plan_id: str, amount: float, status: str = "pending",
                              payment_method: Optional[str] = None, due_date: Optional[datetime] = None,
                              notes: Optional[str] = None) -> None:
        data = {
            "user_id": user_id,
            "plan_id": plan_id,
            "amount": amount,
            "status": status,
            "payment_method": payment_method,
            "due_date": due_date,
            "notes": notes,
            "created_at": datetime.now()
        }
        DatabaseInterface.insert("billing_history", data)

    @staticmethod
    def get_billing_records(user_id: str) -> List[Dict[str, Any]]:
        query = "SELECT * FROM billing_history WHERE user_id = %s ORDER BY created_at DESC"
        return DatabaseInterface.execute_query(query, (user_id,))

def get_invoice(user_id: str, invoice_id: str) -> Optional[Dict[str, Any]]:
    query = "SELECT * FROM invoices WHERE user_id = %s AND id = %s"
    results = DatabaseInterface.execute_query(query, (user_id, invoice_id))
    return results[0] if results else None

@router.post("/billing/history")
def api_insert_billing_record(record: BillingRecordCreate):
    BillingHistory.insert_billing_record(
        record.user_id,
        record.plan_id,
        record.amount,
        record.status,
        record.payment_method,
        record.due_date,
        record.notes
    )
    return {"message": "Billing record inserted"}

@router.get("/billing/history/{user_id}")
def api_get_billing_records(user_id: str):
    return BillingHistory.get_billing_records(user_id)

@router.get("/billing/invoice/{user_id}/{invoice_id}")
def api_get_invoice(user_id: str, invoice_id: str):
    invoice = get_invoice(user_id, invoice_id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice
