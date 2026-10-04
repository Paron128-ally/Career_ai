from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.schemas.assessment import AssessmentSubmission
from app.services.assessment_service import AssessmentService


router = APIRouter(prefix="/assessments", tags=["assessments"])
service = AssessmentService()


@router.get("")
def list_assessments(user=Depends(get_current_user)):
    return service.list_assessments(user)


@router.post("/{assessment_id}/submit")
def submit_assessment(assessment_id: str, body: AssessmentSubmission, user=Depends(get_current_user)):
    return service.submit(user, assessment_id, body.answers)
