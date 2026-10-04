from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.skill_gap_service import SkillGapService


router = APIRouter(prefix="/skill-gap", tags=["skill-gap"])


@router.get("")
def skill_gap(user=Depends(get_current_user)):
    return SkillGapService().analyze(user)
