from typing import Optional

from pydantic import BaseModel


class ResumeUploadResponse(BaseModel):
    id: str
    filename: Optional[str] = None
    status: str = "queued"
    extracted_skills: list[str] = []
