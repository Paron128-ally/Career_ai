class ResumeParser:
    def parse(self, content: bytes, filename: str | None = None) -> dict:
        return {"filename": filename, "text": "", "status": "not_configured"}
