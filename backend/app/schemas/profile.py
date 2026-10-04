from typing import Optional

from pydantic import BaseModel, Field


class ProfileUpdate(BaseModel):
    display_name: Optional[str] = Field(default=None, max_length=120)
    headline: Optional[str] = Field(default=None, max_length=180)
    bio: Optional[str] = Field(default=None, max_length=2000)
    location: Optional[str] = Field(default=None, max_length=120)
