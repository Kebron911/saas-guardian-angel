from typing import List, Dict, Any
from database import DatabaseInterface
from fastapi import APIRouter, HTTPException

router = APIRouter()

def get_user_sessions(user_id: str) -> List[Dict[str, Any]]:
    query = "SELECT * FROM user_sessions WHERE user_id = %s ORDER BY created_at DESC"
    return DatabaseInterface.execute_query(query, (user_id,))

def get_login_history(user_id: str) -> List[Dict[str, Any]]:
    query = "SELECT * FROM login_history WHERE user_id = %s ORDER BY login_time DESC"
    return DatabaseInterface.execute_query(query, (user_id,))

@router.get("/sessions/{user_id}")
def api_get_user_sessions(user_id: str):
    sessions = get_user_sessions(user_id)
    return sessions

@router.get("/login-history/{user_id}")
def api_get_login_history(user_id: str):
    history = get_login_history(user_id)
    return history
