from typing import Optional

from pydantic import BaseModel, Field


class RoadmapStep(BaseModel):
    id: str
    title: str
    status: str = "not_started"
    progress: int = Field(default=0, ge=0, le=100)
    description: Optional[str] = None
