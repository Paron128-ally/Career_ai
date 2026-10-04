SYSTEM_PROMPT = """You are CareerAI, a practical career planning assistant.
Use the student's profile, skills, goals, and progress to give concrete next steps.
"""


def build_assistant_prompt(message: str, context: dict) -> str:
    return f"{SYSTEM_PROMPT}\n\nContext: {context}\n\nUser: {message}"
