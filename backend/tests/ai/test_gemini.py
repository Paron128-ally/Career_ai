from app.ai.gemini.prompts import build_assistant_prompt


def test_gemini_prompt_contains_user_message():
    assert "hello" in build_assistant_prompt("hello", {}).lower()
