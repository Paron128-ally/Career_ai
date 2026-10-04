from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.roadmap_service import RoadmapService


router = APIRouter(prefix="/roadmap", tags=["roadmap"])


@router.get("")
def roadmap(user=Depends(get_current_user)):
    return RoadmapService().get_roadmap(user)
