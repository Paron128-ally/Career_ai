from typing import Any

from .client import GeminiClient
from .prompts import build_assistant_prompt


class GeminiAssistant:
    def __init__(self, client: GeminiClient | None = None):
        self.client = client or GeminiClient()

    def answer(self, message: str, context: dict[str, Any]) -> dict[str, Any]:
        return self.client.generate(build_assistant_prompt(message, context), context)
