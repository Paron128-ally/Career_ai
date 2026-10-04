class AssessmentService:
    def list_assessments(self, user, repository=None):
        return []

    def submit(self, user, assessment_id, answers, repository=None):
        return {"assessment_id": assessment_id, "status": "submitted", "answers": answers}
