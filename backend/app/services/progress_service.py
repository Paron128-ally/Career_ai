class ProgressService:
    def get_progress(self, user, repository=None):
        return {
            "readiness_score": 0,
            "completed_steps": 0,
            "total_steps": 0,
            "streak_days": 0,
        }
