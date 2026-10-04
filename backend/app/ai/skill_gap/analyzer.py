from typing import Any


class SkillGapAnalyzer:
    """Model-independent interface for comparing current and target skills."""

    def analyze(self, current_skills: list[dict[str, Any]], target_skills: list[dict[str, Any]]):
        return []
