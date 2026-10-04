from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.schemas.profile import ProfileUpdate
from app.services.profile_service import ProfileService


router = APIRouter(prefix="/profile", tags=["profile"])
service = ProfileService()


@router.get("/me")
def get_profile(user=Depends(get_current_user)):
    return service.get_profile(user)


@router.put("/me")
def update_profile(body: ProfileUpdate, user=Depends(get_current_user)):
    return service.update_profile(user, body.model_dump(exclude_unset=True))
