from typing import Any


class SkillGapPrioritizer:
    def prioritize(self, gaps: list[dict[str, Any]]) -> list[dict[str, Any]]:
        return sorted(gaps, key=lambda item: item.get("priority", 0), reverse=True)
