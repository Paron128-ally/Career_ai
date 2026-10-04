from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.opportunity_service import OpportunityService


router = APIRouter(prefix="/opportunities", tags=["opportunities"])


@router.get("")
def opportunities(user=Depends(get_current_user)):
    return OpportunityService().list_opportunities(user)
