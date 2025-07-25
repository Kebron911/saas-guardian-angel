from fastapi import FastAPI, Request, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from postgreSQL.database import DatabaseInterface
from postgreSQL.helpers import get_month_range
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import logging
from postgreSQL.admin.activity_log import log_admin_activity

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/api/login")
async def login(request: Request):
    data = await request.json()
    email = data.get("email")
    password = data.get("password")

    try:
        query = """
            SELECT users.id, users.email, user_roles.role, user_profiles.first_name
            FROM user_profiles, user_roles, users
            WHERE user_profiles.user_id = user_roles.user_id
            AND users.id = user_roles.user_id
            AND users.email = %(email)s
            AND users.password_hash = crypt(%(password)s, users.password_hash)
            LIMIT 1
        """
        result = DatabaseInterface.execute_query(query, {"email": email, "password": password})
        user = result[0] if result else None

        if user:
            # Log admin login event if user is admin
            if user["role"] == "admin":
                ip_address = request.client.host if request.client else None
                user_agent = request.headers.get("user-agent")
                log_admin_activity(
                    event_type="admin_login",
                    performed_by=user["id"],
                    details=f"Admin {user['email']} logged in.",
                    ip_address=ip_address,
                    user_agent=user_agent
                )
            return JSONResponse({
                "success": True,
                "user": user,
                "route": "/affiliate" if user["role"] == "affiliate" else "/dashboard"
            })
        else:
            return JSONResponse({"success": False}, status_code=401)
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")