from typing import Any

from pydantic import BaseModel, Field


class AssistantMessage(BaseModel):
    message: str = Field(min_length=1, max_length=8000)
    conversation_id: str | None = None
    context: dict[str, Any] = Field(default_factory=dict)


class AssistantResponse(BaseModel):
    message: str
    conversation_id: str | None = None
    model: str = "not_configured"
