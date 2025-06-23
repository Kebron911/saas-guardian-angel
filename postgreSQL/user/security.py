from typing import List, Dict, Any
from database import DatabaseInterface
from fastapi import APIRouter, HTTPException, Body

router = APIRouter()

def get_two_factor_auth_status(user_id: str) -> bool:
    query = "SELECT two_factor_enabled FROM user_security WHERE user_id = %s"
    results = DatabaseInterface.execute_query(query, (user_id,))
    return results[0].get("two_factor_enabled", False) if results else False

def update_two_factor_auth_status(user_id: str, enabled: bool) -> None:
    query = """
        INSERT INTO user_security (user_id, two_factor_enabled, updated_at)
        VALUES (%s, %s, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET two_factor_enabled = EXCLUDED.two_factor_enabled, updated_at = NOW();
    """
    DatabaseInterface.execute_query(query, (user_id, enabled))

@router.get("/security/{user_id}/2fa")
def api_get_two_factor_auth_status(user_id: str):
    status = get_two_factor_auth_status(user_id)
    return {"two_factor_enabled": status}

@router.put("/security/{user_id}/2fa")
def api_update_two_factor_auth_status(user_id: str, enabled: bool = Body(..., embed=True)):
    update_two_factor_auth_status(user_id, enabled)
    return {"message": "Two-factor authentication status updated"}
