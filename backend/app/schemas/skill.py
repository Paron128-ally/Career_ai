from typing import Optional

from pydantic import BaseModel, Field


class Skill(BaseModel):
    name: str
    level: Optional[str] = None
    score: Optional[int] = Field(default=None, ge=0, le=100)
    source: Optional[str] = None


class SkillUpdate(BaseModel):
    name: str
    level: Optional[str] = None
    score: Optional[int] = Field(default=None, ge=0, le=100)
