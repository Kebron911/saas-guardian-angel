from typing import Dict, Any, Optional
from database import DatabaseInterface
from fastapi import APIRouter, HTTPException, Body

router = APIRouter()

def get_profile_settings(user_id: str) -> Dict[str, Any]:
    query = "SELECT * FROM user_profiles WHERE user_id = %s"
    results = DatabaseInterface.execute_query(query, (user_id,))
    return results[0] if results else {}

def update_profile_settings(user_id: str, data: Dict[str, Any]) -> None:
    query = """
        INSERT INTO user_profiles (user_id, name, bio, avatar_url, updated_at)
        VALUES (%(user_id)s, %(name)s, %(bio)s, %(avatar_url)s, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET name = EXCLUDED.name, bio = EXCLUDED.bio, avatar_url = EXCLUDED.avatar_url, updated_at = NOW();
    """
    data['user_id'] = user_id
    DatabaseInterface.execute_query(query, data)

@router.get("/profile/{user_id}")
def api_get_profile_settings(user_id: str):
    profile = get_profile_settings(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/profile/{user_id}")
def api_update_profile_settings(user_id: str, data: Dict[str, Any] = Body(...)):
    update_profile_settings(user_id, data)
    return {"message": "Profile updated successfully"}
