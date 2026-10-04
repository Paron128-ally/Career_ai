from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.learning_service import LearningService


router = APIRouter(prefix="/learning", tags=["learning"])


@router.get("")
def learning_resources(user=Depends(get_current_user)):
    return LearningService().list_resources(user)
