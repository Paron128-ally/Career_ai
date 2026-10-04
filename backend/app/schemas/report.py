from typing import Optional

from pydantic import BaseModel


class ReportSummary(BaseModel):
    id: str
    title: str
    status: str = "available"
    download_url: Optional[str] = None
