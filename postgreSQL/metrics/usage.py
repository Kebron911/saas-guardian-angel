from typing import List, Dict, Any
from database import DatabaseInterface
from fastapi import APIRouter, Query, Body

router = APIRouter()

def get_user_metrics(user_id: str) -> Dict[str, Any]:
    query = """
        SELECT 
            (SELECT COUNT(*) FROM user_sessions WHERE user_id = %s) AS session_count,
            (SELECT COUNT(*) FROM user_activity_logs WHERE user_id = %s) AS activity_count,
            (SELECT MAX(login_time) FROM login_history WHERE user_id = %s) AS last_login
    """
    results = DatabaseInterface.execute_query(query, (user_id, user_id, user_id))
    return results[0] if results else {}

def get_activity_logs(user_id: str, limit: int = 50) -> List[Dict[str, Any]]:
    query = "SELECT * FROM user_activity_logs WHERE user_id = %s ORDER BY activity_time DESC LIMIT %s"
    return DatabaseInterface.execute_query(query, (user_id, limit))

def get_plan_usage(user_id: str) -> Dict[str, Any]:
    query = "SELECT * FROM plan_usage WHERE user_id = %s"
    results = DatabaseInterface.execute_query(query, (user_id,))
    return results[0] if results else {}

def update_plan_usage(user_id: str, data: Dict[str, Any]) -> None:
    query = """
        INSERT INTO plan_usage (user_id, usage_count, last_updated)
        VALUES (%(user_id)s, %(usage_count)s, NOW())
        ON CONFLICT (user_id)
        DO UPDATE SET usage_count = EXCLUDED.usage_count, last_updated = NOW();
    """
    data['user_id'] = user_id
    DatabaseInterface.execute_query(query, data)

@router.get("/usage/{user_id}/metrics")
def api_get_user_metrics(user_id: str):
    return get_user_metrics(user_id)

@router.get("/usage/{user_id}/activity-logs")
def api_get_activity_logs(user_id: str, limit: int = Query(50, ge=1, le=200)):
    return get_activity_logs(user_id, limit)

@router.get("/usage/{user_id}/plan")
def api_get_plan_usage(user_id: str):
    return get_plan_usage(user_id)

@router.put("/usage/{user_id}/plan")
def api_update_plan_usage(user_id: str, data: Dict[str, Any] = Body(...)):
    update_plan_usage(user_id, data)
    return {"message": "Plan usage updated"}
