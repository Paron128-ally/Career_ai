from pydantic import BaseModel, Field


class SkillGap(BaseModel):
    skill: str
    current_level: str = "unknown"
    target_level: str = "job_ready"
    priority: int = Field(default=1, ge=1, le=5)
    recommendation: str | None = None
