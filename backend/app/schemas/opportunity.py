from typing import Optional

from pydantic import BaseModel


class Opportunity(BaseModel):
    id: str
    title: str
    organization: Optional[str] = None
    location: Optional[str] = None
    url: Optional[str] = None
