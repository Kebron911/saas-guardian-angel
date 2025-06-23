from typing import Dict, Any
from fastapi import APIRouter, HTTPException, Body
from database import DatabaseInterface

router = APIRouter()

def get_notification_settings(user_id: str) -> Dict[str, Any]:
    query = "SELECT * FROM notification_settings WHERE user_id = %s"
    results = DatabaseInterface.execute_query(query, (user_id,))
    return results[0] if results else {}

def update_notification_settings(user_id: str, data: Dict[str, Any]) -> None:
    query = """
        INSERT INTO notification_settings (user_id, email_notifications, push_notifications, sms_notifications, updated_at)
        VALUES (%(user_id)s, %(email_notifications)s, %(push_notifications)s, %(sms_notifications)s, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET email_notifications = EXCLUDED.email_notifications,
                      push_notifications = EXCLUDED.push_notifications,
                      sms_notifications = EXCLUDED.sms_notifications,
                      updated_at = NOW();
    """
    data['user_id'] = user_id
    DatabaseInterface.execute_query(query, data)

def get_email_digest_frequency(user_id: str) -> str:
    query = "SELECT email_digest_frequency FROM user_preferences WHERE user_id = %s"
    results = DatabaseInterface.execute_query(query, (user_id,))
    if results:
        return results[0].get("email_digest_frequency", "daily")
    return "daily"

def update_email_digest_frequency(user_id: str, frequency: str) -> None:
    query = """
        INSERT INTO user_preferences (user_id, email_digest_frequency, updated_at)
        VALUES (%s, %s, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET email_digest_frequency = EXCLUDED.email_digest_frequency, updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, (user_id, frequency))

@router.get("/notifications/{user_id}/settings")
def api_get_notification_settings(user_id: str):
    settings = get_notification_settings(user_id)
    if not settings:
        raise HTTPException(status_code=404, detail="Notification settings not found")
    return settings

@router.put("/notifications/{user_id}/settings")
def api_update_notification_settings(user_id: str, data: Dict[str, Any] = Body(...)):
    update_notification_settings(user_id, data)
    return {"message": "Notification settings updated"}

@router.get("/notifications/{user_id}/email-digest-frequency")
def api_get_email_digest_frequency(user_id: str):
    frequency = get_email_digest_frequency(user_id)
    return {"email_digest_frequency": frequency}

@router.put("/notifications/{user_id}/email-digest-frequency")
def api_update_email_digest_frequency(user_id: str, frequency: str = Body(..., embed=True)):
    update_email_digest_frequency(user_id, frequency)
    return {"message": "Email digest frequency updated"}
