from typing import Sequence


class EmbeddingProvider:
    """Provider-neutral boundary for semantic search and recommendations."""

    def embed(self, text: str) -> Sequence[float]:
        raise NotImplementedError("Embedding provider is not configured")
