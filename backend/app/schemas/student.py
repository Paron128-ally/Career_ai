from typing import Any, Optional

from pydantic import BaseModel, Field


class StudentProfile(BaseModel):
    id: Optional[str] = None
    email: Optional[str] = None
    role: str = "student"
    display_name: Optional[str] = None
    metadata: dict[str, Any] = Field(default_factory=dict)


class DashboardSummary(BaseModel):
    user: StudentProfile
    readiness_score: Optional[int] = None
    next_step: Optional[str] = None
