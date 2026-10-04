from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.services.student_service import StudentService


router = APIRouter(prefix="/students", tags=["students"])


@router.get("/me")
def get_me(user=Depends(get_current_user)):
    return StudentService().get_student(user)


@router.get("/me/dashboard")
def get_dashboard(user=Depends(get_current_user)):
    return StudentService().get_dashboard(user)
