from typing import Any

from app.core.config import get_settings
from app.core.exceptions import NotConfiguredError


class GeminiClient:
    """Small provider boundary; keep Gemini SDK details out of route code."""

    def __init__(self):
        settings = get_settings()
        self.api_key = getattr(settings, "gemini_api_key", None)
        self.model = getattr(settings, "ai_model", "gemini-2.0-flash")

    @property
    def is_configured(self) -> bool:
        return bool(self.api_key)

    def generate(self, message: str, context: dict[str, Any]) -> dict[str, Any]:
        if not self.is_configured:
            raise NotConfiguredError("AI provider is not configured")
        # Add the Gemini SDK/API call here later. The route contract is stable.
        raise NotImplementedError("Gemini provider adapter is ready for implementation")
