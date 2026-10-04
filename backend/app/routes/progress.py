from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.progress_service import ProgressService


router = APIRouter(prefix="/progress", tags=["progress"])


@router.get("")
def progress(user=Depends(get_current_user)):
    return ProgressService().get_progress(user)
