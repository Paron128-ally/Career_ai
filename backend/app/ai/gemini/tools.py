from typing import Any, Callable


class AssistantTools:
    """Registry for safe application tools exposed to the future model."""

    def __init__(self):
        self._tools: dict[str, Callable[..., Any]] = {}

    def register(self, name: str, function: Callable[..., Any]) -> None:
        self._tools[name] = function

    def names(self) -> list[str]:
        return sorted(self._tools)
