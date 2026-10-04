from pathlib import Path


ALLOWED_RESUME_EXTENSIONS = {".pdf", ".doc", ".docx", ".txt"}


def extension_for(filename: str) -> str:
    return Path(filename).suffix.lower()


def is_supported_resume(filename: str) -> bool:
    return extension_for(filename) in ALLOWED_RESUME_EXTENSIONS
