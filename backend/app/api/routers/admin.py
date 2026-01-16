from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from app.db.prisma import prisma
from app.api.utils.security import get_current_user, get_current_super_admin

router = APIRouter(prefix="/admin", tags=["admin"])


class UpsertMatchBody(BaseModel):
    sportSlug: str
    teamA: str
    teamB: str
    status: str = "UPCOMING"
    startTime: str | None = None
    venue: str | None = None
    score: dict[str, Any] | None = None


class UpdateMatchBody(BaseModel):
    teamA: str | None = None
    teamB: str | None = None
    status: str | None = None
    startTime: str | None = None
    venue: str | None = None
    score: dict[str, Any] | None = None


class CreateAnnouncementBody(BaseModel):
    title: str
    body: str
    pinned: bool = False


class UpdateAnnouncementBody(BaseModel):
    title: str | None = None
    body: str | None = None
    pinned: bool | None = None


@router.post("/matches")
async def create_match(
    body: UpsertMatchBody, 
    current_admin=Depends(get_current_user)
) -> dict:
    sport = await prisma.sport.find_unique(where={"slug": body.sportSlug})
    if sport is None:
        raise HTTPException(status_code=404, detail="Sport not found")

    if current_admin.role != "SUPER_ADMIN":
        if current_admin.sportId != sport.id:
            raise HTTPException(
                status_code=403, 
                detail="You do not have permission to manage this sport"
            )

    match = await prisma.match.create(
        data={
            "sportId": sport.id,
            "teamA": body.teamA,
            "teamB": body.teamB,
            "status": body.status,
            "venue": body.venue,
            "score": body.score,
        }
    )
    return {"item": match}


@router.get("/matches/{match_id}")
async def get_match(
    match_id: str,
    current_admin=Depends(get_current_user)
) -> dict:
    match = await prisma.match.find_unique(
        where={"id": match_id},
        include={"sport": True}
    )
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    
    # Check permission
    if current_admin.role != "SUPER_ADMIN":
        if current_admin.sportId != match.sportId:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to view this match"
            )
    
    return {"item": match}


@router.patch("/matches/{match_id}")
async def update_match(
    match_id: str,
    body: UpdateMatchBody,
    current_admin=Depends(get_current_user)
) -> dict:
    # Find the match
    match = await prisma.match.find_unique(
        where={"id": match_id},
        include={"sport": True}
    )
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    
    # Check permission
    if current_admin.role != "SUPER_ADMIN":
        if current_admin.sportId != match.sportId:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to update this match"
            )
    
    # Build update data (only include fields that were provided)
    update_data = {}
    if body.teamA is not None:
        update_data["teamA"] = body.teamA
    if body.teamB is not None:
        update_data["teamB"] = body.teamB
    if body.status is not None:
        update_data["status"] = body.status
    if body.startTime is not None:
        update_data["startTime"] = body.startTime
    if body.venue is not None:
        update_data["venue"] = body.venue
    if body.score is not None:
        update_data["score"] = body.score
    
    # Update the match
    updated_match = await prisma.match.update(
        where={"id": match_id},
        data=update_data,
        include={"sport": True}
    )
    
    return {"item": updated_match}


@router.delete("/matches/{match_id}")
async def delete_match(
    match_id: str,
    current_admin=Depends(get_current_user)
) -> dict:
    # Find the match
    match = await prisma.match.find_unique(where={"id": match_id})
    if match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    
    # Check permission
    if current_admin.role != "SUPER_ADMIN":
        if current_admin.sportId != match.sportId:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission to delete this match"
            )
    
    # Delete the match
    await prisma.match.delete(where={"id": match_id})
    
    return {"message": "Match deleted successfully"}


@router.get("/matches")
async def list_admin_matches(
    current_admin=Depends(get_current_user),
    sport_id: str | None = None,
    status: str | None = None
) -> dict:
    """List matches for admin - filtered by their sport if not SUPER_ADMIN"""
    where_clause = {}
    
    # Sport admins can only see their sport's matches
    if current_admin.role != "SUPER_ADMIN":
        where_clause["sportId"] = current_admin.sportId
    elif sport_id:
        where_clause["sportId"] = sport_id
    
    if status:
        where_clause["status"] = status
    
    matches = await prisma.match.find_many(
        where=where_clause,
        include={"sport": True},
        order={"updatedAt": "desc"}
    )
    
    return {"items": matches}


# Announcement Management
@router.post("/announcements")
async def create_announcement(
    body: CreateAnnouncementBody,
    current_admin=Depends(get_current_super_admin)
) -> dict:
    """Create an announcement (SUPER_ADMIN only)"""
    
    announcement = await prisma.announcement.create(
        data={
            "title": body.title,
            "body": body.body,
            "pinned": body.pinned
        }
    )
    
    return {"item": announcement}


@router.patch("/announcements/{announcement_id}")
async def update_announcement(
    announcement_id: str,
    body: UpdateAnnouncementBody,
    current_admin=Depends(get_current_super_admin)
) -> dict:
    """Update an announcement (SUPER_ADMIN only)"""
    
    announcement = await prisma.announcement.find_unique(
        where={"id": announcement_id}
    )
    if announcement is None:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    update_data = {}
    if body.title is not None:
        update_data["title"] = body.title
    if body.body is not None:
        update_data["body"] = body.body
    if body.pinned is not None:
        update_data["pinned"] = body.pinned
    
    updated_announcement = await prisma.announcement.update(
        where={"id": announcement_id},
        data=update_data
    )
    
    return {"item": updated_announcement}


@router.delete("/announcements/{announcement_id}")
async def delete_announcement(
    announcement_id: str,
    current_admin=Depends(get_current_super_admin)
) -> dict:
    """Delete an announcement (SUPER_ADMIN only)"""
    
    announcement = await prisma.announcement.find_unique(
        where={"id": announcement_id}
    )
    if announcement is None:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    await prisma.announcement.delete(where={"id": announcement_id})
    
    return {"message": "Announcement deleted successfully"}
