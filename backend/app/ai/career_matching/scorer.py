from typing import Any


class CareerScorer:
    """Extension point for scoring a profile against a career."""

    def score(self, profile: dict[str, Any], career: dict[str, Any]) -> float:
        return 0.0
