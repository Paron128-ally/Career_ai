from typing import Optional

from fastapi import Cookie, Depends, Header

from app.core.exceptions import unauthorized
from app.database.supabase import get_supabase


def get_bearer_token(authorization: Optional[str]) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise unauthorized("Missing bearer token")
    return authorization.split(" ", 1)[1]


def get_current_user(
    authorization: Optional[str] = Header(default=None),
    supabase=Depends(get_supabase),
):
    token = get_bearer_token(authorization)
    try:
        user = supabase.auth.get_user(token).user
    except Exception as exc:
        raise unauthorized(str(exc)) from exc
    if user is None:
        raise unauthorized("Invalid session")
    return user


def get_optional_user(
    authorization: Optional[str] = Header(default=None),
    supabase=Depends(get_supabase),
):
    if not authorization:
        return None
    try:
        return get_current_user(authorization, supabase)
    except Exception:
        return None


def get_google_handoff_tokens(
    access_token: Optional[str] = Cookie(default=None, alias="google_oauth_access_token"),
    refresh_token: Optional[str] = Cookie(default=None, alias="google_oauth_refresh_token"),
) -> tuple[Optional[str], Optional[str]]:
    return access_token, refresh_token
