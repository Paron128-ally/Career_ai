from typing import Optional

from pydantic import BaseModel


class Recommendation(BaseModel):
    id: str
    title: str
    kind: str = "learning"
    description: Optional[str] = None
    url: Optional[str] = None
