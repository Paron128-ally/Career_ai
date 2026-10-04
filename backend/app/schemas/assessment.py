from typing import Any, Optional

from pydantic import BaseModel, Field


class Assessment(BaseModel):
    id: str
    title: str
    status: str = "not_started"
    score: Optional[int] = Field(default=None, ge=0, le=100)


class AssessmentSubmission(BaseModel):
    answers: dict[str, Any] = Field(default_factory=dict)
