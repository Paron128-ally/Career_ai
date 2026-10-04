from typing import Any


class CareerMatcher:
    """Extension point for retrieving candidate career matches."""

    def match(self, profile: dict[str, Any], careers: list[dict[str, Any]]) -> list[dict[str, Any]]:
        return careers
