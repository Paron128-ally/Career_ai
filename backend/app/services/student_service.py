from app.core.security import user_payload


class StudentService:
    def get_dashboard(self, user):
        return {
            "user": user_payload(user),
            "readiness_score": None,
            "next_step": "Complete your profile to personalize your CareerAI plan.",
        }

    def get_student(self, user):
        return user_payload(user)
