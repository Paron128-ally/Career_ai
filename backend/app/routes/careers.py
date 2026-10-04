from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.recommendation_service import RecommendationService


router = APIRouter(prefix="/careers", tags=["careers"])


@router.get("/recommendations")
def career_recommendations(user=Depends(get_current_user)):
    return RecommendationService().list_recommendations(user)
