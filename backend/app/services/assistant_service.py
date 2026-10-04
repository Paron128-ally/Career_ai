from app.ai.gemini.client import GeminiClient


class AssistantService:
    def __init__(self, model_client: GeminiClient | None = None):
        self.model_client = model_client or GeminiClient()

    def respond(self, user, message: str, context: dict):
        if not self.model_client.is_configured:
            return {
                "message": "The CareerAI assistant is ready for a model connection. Configure the AI provider to enable responses.",
                "conversation_id": None,
                "model": "not_configured",
            }
        try:
            return self.model_client.generate(message=message, context=context)
        except NotImplementedError:
            return {
                "message": "The AI provider adapter is configured but its model call is not implemented yet.",
                "conversation_id": None,
                "model": self.model_client.model,
            }
