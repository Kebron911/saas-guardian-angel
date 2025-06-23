from typing import Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import DatabaseInterface

router = APIRouter(prefix="/users/preferences", tags=["User Preferences"])


# -----------------------------
# Pydantic models
# -----------------------------
class UserPreferences(BaseModel):
    language: str
    timezone: str
    notifications_enabled: bool


# -----------------------------
# Internal database access
# -----------------------------
def get_user_preferences(user_id: str) -> Dict[str, Any]:
    query = "SELECT * FROM user_preferences WHERE user_id = %s"
    results = DatabaseInterface.execute_query(query, (user_id,))
    return results[0] if results else {}

def update_user_preferences(user_id: str, data: Dict[str, Any]) -> None:
    query = """
        INSERT INTO user_preferences (user_id, language, timezone, notifications_enabled, updated_at)
        VALUES (%(user_id)s, %(language)s, %(timezone)s, %(notifications_enabled)s, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET language = EXCLUDED.language,
                      timezone = EXCLUDED.timezone,
                      notifications_enabled = EXCLUDED.notifications_enabled,
                      updated_at = NOW();
    """
    data['user_id'] = user_id
    DatabaseInterface.execute_query(query, data)


# -----------------------------
# API endpoints
# -----------------------------
@router.get("/{user_id}", response_model=UserPreferences)
def api_get_user_preferences(user_id: str):
    prefs = get_user_preferences(user_id)
    if not prefs:
        raise HTTPException(status_code=404, detail="User preferences not found")
    return prefs

@router.put("/{user_id}")
def api_update_user_preferences(user_id: str, preferences: UserPreferences):
    update_user_preferences(user_id, preferences.dict())
    return {"message": "Preferences updated successfully"}
