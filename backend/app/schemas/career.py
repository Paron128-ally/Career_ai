from typing import Optional

from pydantic import BaseModel, Field


class Career(BaseModel):
    id: str
    title: str
    match_score: Optional[int] = Field(default=None, ge=0, le=100)
    summary: Optional[str] = None


class CareerMatch(BaseModel):
    careers: list[Career] = Field(default_factory=list)
