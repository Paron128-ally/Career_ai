from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.schemas.skill import SkillUpdate
from app.services.skill_service import SkillService


router = APIRouter(prefix="/skills", tags=["skills"])
service = SkillService()


@router.get("")
def list_skills(user=Depends(get_current_user)):
    return service.list_skills(user)


@router.post("")
def add_skill(body: SkillUpdate, user=Depends(get_current_user)):
    return service.add_skill(user, body.model_dump())
