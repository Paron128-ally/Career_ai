import re


def normalize_email(email: str) -> str:
    return email.strip().lower()


def is_safe_filename(filename: str) -> bool:
    return bool(filename) and not re.search(r"[\\/:*?\"<>|]", filename)
