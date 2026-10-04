from typing import Any


def user_metadata(user: Any) -> dict[str, Any]:
    return getattr(user, "user_metadata", None) or {}


def user_payload(user: Any) -> dict[str, Any]:
    metadata = user_metadata(user)
    return {
        "id": user.id,
        "email": user.email,
        "role": metadata.get("role"),
        "user_metadata": metadata,
    }
