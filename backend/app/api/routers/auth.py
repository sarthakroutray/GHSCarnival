"""Authentication endpoints for admin login"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.db.prisma import prisma
from app.api.utils.security import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginResponse(BaseModel):
    user: dict
    message: str


@router.get("/me")
async def get_current_user_info(current_user=Depends(get_current_user)) -> dict:
    """
    Get current authenticated user information.
    Used by frontend to verify token and get user details.
    """
    user_data = {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
        "role": current_user.role,
        "sportId": current_user.sportId,
    }
    
    # Include sport info if user is a sport admin
    if current_user.sport:
        user_data["sport"] = {
            "id": current_user.sport.id,
            "name": current_user.sport.name,
            "slug": current_user.sport.slug,
        }
    
    return {"user": user_data}


@router.post("/verify-token")
async def verify_token(current_user=Depends(get_current_user)) -> dict:
    """
    Verify if the provided token is valid.
    Returns user info if valid, raises 401 if invalid.
    """
    return {
        "valid": True,
        "user": {
            "id": current_user.id,
            "email": current_user.email,
            "role": current_user.role,
        }
    }
