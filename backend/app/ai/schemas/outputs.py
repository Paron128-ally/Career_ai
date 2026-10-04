from typing import Any, Optional

from pydantic import BaseModel, Field


class AIOutput(BaseModel):
    content: str
    model: str = "not_configured"
    confidence: Optional[float] = Field(default=None, ge=0, le=1)
    metadata: dict[str, Any] = Field(default_factory=dict)
