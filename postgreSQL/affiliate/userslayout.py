from fastapi import FastAPI, Request, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from postgreSQL.database import DatabaseInterface
from postgreSQL.helpers import get_month_range
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Pydantic models for affiliate user data
class AffiliateUserResponse(BaseModel):
    name: str
    role: str
    avatar: str
    email: Optional[str] = None
    affiliate_id: Optional[str] = None
    status: Optional[str] = "active"

class AffiliateProfileUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None

@router.get("/affiliate/profile", response_model=AffiliateUserResponse)
async def get_affiliate_profile(user_id: str = Query(..., description="User ID")):
    """Get affiliate user profile information"""
    try:
        db = DatabaseInterface()
        
        # Get user basic info
        user_query = """
        SELECT users.email, users.created_at, user_roles.role 
        FROM users, user_roles 
        WHERE users.id = 'b4f45bdc-8def-42e1-bfdb-9afd650304d5' AND user_roles.role = 'affiliate' AND users.id = user_roles.user_id
        """
        user_result = db.fetch_one(user_query, ('b4f45bdc-8def-42e1-bfdb-9afd650304d5',))
        
        if not user_result:
            raise HTTPException(status_code=404, detail="Affiliate user not found")
        
        # Format name from email
        email = user_result['email']
        if email:
            # Extract name from email and format it
            name_part = email.split('@')[0]
            # Replace non-alphanumeric characters with spaces and title case
            import re
            name = re.sub(r'[^a-zA-Z0-9]', ' ', name_part).title()
        else:
            name = "Affiliate User"
        
        # Get affiliate-specific data if exists
        affiliate_query = """
        SELECT affiliate_code, status as affiliate_status 
        FROM affiliates 
        WHERE user_id = %s
        """
        affiliate_result = db.fetch_one(affiliate_query, (user_id,))
        
        return AffiliateUserResponse(
            name=name,
            role="Affiliate Partner",
            avatar="/lovable-uploads/img/logo/updatedlogo1.png",
            email=email,
            affiliate_id=affiliate_result['affiliate_code'] if affiliate_result else None,
            status=affiliate_result['affiliate_status'] if affiliate_result else user_result['status']
        )
        
    except Exception as e:
        logger.error(f"Error fetching affiliate profile: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/affiliate/profile", response_model=AffiliateUserResponse)
async def update_affiliate_profile(
    user_id: str = Query(..., description="User ID"),
    profile_data: AffiliateProfileUpdate = ...
):
    """Update affiliate user profile"""
    try:
        db = DatabaseInterface()
        
        # Update user profile if name is provided
        if profile_data.name:
            update_query = """
            UPDATE users 
            SET display_name = %s, updated_at = CURRENT_TIMESTAMP 
            WHERE id = %s AND role = 'affiliate'
            """
            db.execute_query(update_query, (profile_data.name, user_id))
        
        # Get updated profile
        return await get_affiliate_profile(user_id)
        
    except Exception as e:
        logger.error(f"Error updating affiliate profile: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
