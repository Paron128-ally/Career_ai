import base64
import hashlib
import secrets
from typing import Optional
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, Cookie, Depends, Header, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse

from app.core.config import get_settings
from app.core.dependencies import get_bearer_token, get_google_handoff_tokens
from app.core.security import user_payload
from app.database.supabase import get_supabase
from app.schemas.auth import CodeBody, SignInBody, SignUpBody
from app.services.auth_service import AuthService


router = APIRouter(prefix="/auth", tags=["auth"])


def pkce_pair() -> tuple[str, str]:
    verifier = secrets.token_urlsafe(64)
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    challenge = base64.urlsafe_b64encode(digest).decode("ascii").rstrip("=")
    return verifier, challenge


def auth_error(exc: Exception) -> HTTPException:
    return HTTPException(status_code=400, detail=str(exc) or "Supabase request failed")


def clear_google_cookies(response) -> None:
    for key in (
        "google_oauth_state",
        "google_pkce_verifier",
        "google_oauth_access_token",
        "google_oauth_refresh_token",
    ):
        response.delete_cookie(key=key, path="/")


def google_error_redirect(message: str) -> RedirectResponse:
    settings = get_settings()
    return RedirectResponse(
        url=f"{settings.frontend_origin}/auth/callback?{urlencode({'error_description': message})}"
    )


@router.post("/signup")
def signup(body: SignUpBody, supabase=Depends(get_supabase)):
    try:
        return AuthService(supabase).signup(body.email, body.password, body.role)
    except Exception as exc:
        raise auth_error(exc) from exc


@router.post("/signin")
def signin(body: SignInBody, supabase=Depends(get_supabase)):
    try:
        return AuthService(supabase).signin(body.email, body.password)
    except Exception as exc:
        raise auth_error(exc) from exc


@router.get("/google/start")
def google_start() -> RedirectResponse:
    settings = get_settings()
    client_id, client_secret = settings.google_credentials

    if client_id and client_secret:
        verifier, challenge = pkce_pair()
        state = secrets.token_urlsafe(32)
        query = urlencode(
            {
                "client_id": client_id,
                "redirect_uri": settings.google_redirect,
                "response_type": "code",
                "scope": "openid email profile",
                "access_type": "offline",
                "prompt": "select_account",
                "state": state,
                "code_challenge": challenge,
                "code_challenge_method": "S256",
            }
        )
        response = RedirectResponse(
            url=f"https://accounts.google.com/o/oauth2/v2/auth?{query}"
        )
        response.set_cookie(
            "google_oauth_state",
            state,
            httponly=True,
            secure=settings.cookie_secure,
            samesite="lax",
            max_age=600,
            path="/",
        )
        response.set_cookie(
            "google_pkce_verifier",
            verifier,
            httponly=True,
            secure=settings.cookie_secure,
            samesite="lax",
            max_age=600,
            path="/",
        )
        return response

    verifier, challenge = pkce_pair()
    query = urlencode(
        {
            "provider": "google",
            "redirect_to": settings.supabase_redirect,
            "code_challenge": challenge,
            "code_challenge_method": "S256",
            "apikey": settings.supabase_anon_key,
        }
    )
    response = RedirectResponse(
        url=f"{settings.supabase_url.rstrip('/')}/auth/v1/authorize?{query}"
    )
    response.set_cookie(
        "pkce_verifier",
        verifier,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=600,
        path="/",
    )
    return response


@router.get("/google/callback")
def google_callback(
    code: Optional[str] = None,
    state: Optional[str] = None,
    error: Optional[str] = None,
    error_description: Optional[str] = None,
    google_oauth_state: Optional[str] = Cookie(default=None),
    google_pkce_verifier: Optional[str] = Cookie(default=None),
) -> RedirectResponse:
    settings = get_settings()
    if error:
        response = google_error_redirect(error_description or error)
        clear_google_cookies(response)
        return response

    if not code or not state or not google_oauth_state or not secrets.compare_digest(
        state, google_oauth_state
    ):
        response = google_error_redirect("Invalid Google OAuth state")
        clear_google_cookies(response)
        return response

    client_id, client_secret = settings.google_credentials
    if not google_pkce_verifier or not client_id or not client_secret:
        response = google_error_redirect("Google OAuth is not configured")
        clear_google_cookies(response)
        return response

    try:
        with httpx.Client(timeout=15) as client:
            token_response = client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "code": code,
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "redirect_uri": settings.google_redirect,
                    "grant_type": "authorization_code",
                    "code_verifier": google_pkce_verifier,
                },
            )
            token_response.raise_for_status()
            token_data = token_response.json()

        google_id_token = token_data.get("id_token")
        if not google_id_token:
            raise ValueError("Google did not return an ID token")
        payload = AuthService(get_supabase()).exchange_google_id_token(google_id_token)
    except Exception as exc:
        response = google_error_redirect(str(exc) or "Google sign-in failed")
        clear_google_cookies(response)
        return response

    response = RedirectResponse(url=f"{settings.frontend_origin}/auth/callback")
    response.set_cookie(
        "google_oauth_access_token",
        payload["access_token"],
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=300,
        path="/",
    )
    response.set_cookie(
        "google_oauth_refresh_token",
        payload["refresh_token"],
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=300,
        path="/",
    )
    response.delete_cookie("google_oauth_state", path="/")
    response.delete_cookie("google_pkce_verifier", path="/")
    return response


@router.get("/google/session")
def google_session(
    tokens=Depends(get_google_handoff_tokens),
    supabase=Depends(get_supabase),
) -> JSONResponse:
    access_token, refresh_token = tokens
    if not access_token:
        raise HTTPException(status_code=401, detail="No Google OAuth session found")
    try:
        user = supabase.auth.get_user(access_token).user
        if user is None:
            raise ValueError("Invalid session")
        payload = {
            "access_token": access_token,
            "refresh_token": refresh_token or "",
            "token_type": "bearer",
            "user": user_payload(user),
        }
    except Exception as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc

    response = JSONResponse(content=payload)
    response.delete_cookie("google_oauth_access_token", path="/")
    response.delete_cookie("google_oauth_refresh_token", path="/")
    return response


@router.post("/google/exchange")
def google_exchange(
    body: CodeBody,
    pkce_verifier: Optional[str] = Cookie(default=None),
    supabase=Depends(get_supabase),
):
    if not pkce_verifier:
        raise HTTPException(
            status_code=400,
            detail="Missing PKCE verifier cookie. Start Google sign-in first.",
        )
    try:
        return AuthService(supabase).exchange_supabase_code(body.code, pkce_verifier)
    except Exception as exc:
        raise auth_error(exc) from exc


@router.get("/me")
def me(
    authorization: Optional[str] = Header(default=None),
    supabase=Depends(get_supabase),
):
    # This endpoint keeps the existing frontend contract while using the
    # shared service layer. Header extraction is handled explicitly here so
    # this route remains easy to call from non-FastAPI clients too.
    token = get_bearer_token(authorization)
    try:
        return AuthService(supabase).current_user_payload(token)
    except Exception as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc
