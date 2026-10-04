from pydantic import BaseModel, Field


class ProgressSummary(BaseModel):
    readiness_score: int = Field(default=0, ge=0, le=100)
    completed_steps: int = Field(default=0, ge=0)
    total_steps: int = Field(default=0, ge=0)
    streak_days: int = Field(default=0, ge=0)
