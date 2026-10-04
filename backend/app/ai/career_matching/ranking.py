from typing import Any


class CareerRanker:
    def rank(self, matches: list[dict[str, Any]]) -> list[dict[str, Any]]:
        return sorted(matches, key=lambda item: item.get("match_score", 0), reverse=True)
