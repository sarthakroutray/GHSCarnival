"""Authentication and authorization utilities"""
from __future__ import annotations

import os
from typing import Optional

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

from app.db.prisma import prisma

load_dotenv()

# Use HTTPBearer for JWT tokens in Authorization header
security = HTTPBearer(auto_error=False)

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """
    Verify Supabase JWT token and return the user from database.
    
    For testing without Supabase, you can pass a user ID directly as the token.
    In production, this validates the JWT signature.
    """
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token = credentials.credentials
    
    # Try JWT verification first (production mode)
    if SUPABASE_JWT_SECRET:
        try:
            # Decode and verify the JWT token
            payload = jwt.decode(
                token,
                SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                audience="authenticated",
            )
            
            # Extract user ID from Supabase JWT payload
            user_id = payload.get("sub")
            
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token payload",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except jwt.InvalidTokenError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )
    else:
        # Development mode: treat token as user ID directly
        # This allows testing with seeded admin IDs
        user_id = token
    
    # Fetch user from database
    user = await prisma.user.find_unique(
        where={"id": user_id},
        include={"sport": True}
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user


async def get_current_admin(
    current_user = Depends(get_current_user)
):
    """
    Dependency to ensure the current user has admin privileges.
    Used for endpoints that require any admin role.
    """
    if current_user.role not in ["SUPER_ADMIN", "SPORT_ADMIN"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user


async def get_current_super_admin(
    current_user = Depends(get_current_user)
):
    """
    Dependency to ensure the current user is a super admin.
    Used for endpoints that require super admin privileges only.
    """
    if current_user.role != "SUPER_ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super admin privileges required"
        )
    return current_user
