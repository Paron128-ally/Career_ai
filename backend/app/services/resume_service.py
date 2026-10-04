import uuid


class ResumeService:
    def queue_resume(self, user, filename: str | None = None):
        return {
            "id": str(uuid.uuid4()),
            "filename": filename,
            "status": "queued",
            "extracted_skills": [],
        }
