from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.report_service import ReportService


router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("")
def reports(user=Depends(get_current_user)):
    return ReportService().list_reports(user)
