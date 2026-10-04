from typing import Optional

from pydantic import BaseModel


class LearningResource(BaseModel):
    id: str
    title: str
    resource_type: str = "course"
    duration: Optional[str] = None
    url: Optional[str] = None
