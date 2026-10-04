from typing import Optional

from fastapi import APIRouter, Depends, Query

from app.core.dependencies import get_current_user
from app.services.resume_service import ResumeService


router = APIRouter(prefix="/resumes", tags=["resumes"])
service = ResumeService()


@router.post("")
def upload_resume(
    filename: Optional[str] = Query(default=None),
    user=Depends(get_current_user),
):
    # File storage/parsing will be added through app.utils.files and app.ai.resume.
    return service.queue_resume(user, filename)
