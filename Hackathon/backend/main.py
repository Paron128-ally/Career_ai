import base64
import hashlib
import os
import secrets
from typing import Any, Literal, Optional
from urllib.parse import urlencode

from dotenv import load_dotenv
from fastapi import Cookie, Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr, Field
from supabase import Client, create_client

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPABASE_ANON_KEY = os.environ["SUPABASE_ANON_KEY"]
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173").rstrip("/")
GOOGLE_OAUTH_REDIRECT = os.getenv(
    "GOOGLE_OAUTH_REDIRECT", f"{FRONTEND_URL}/auth/callback"
)

Role = Literal["student", "fresher", "working_professional"]

app = FastAPI(title="CareerAI Auth")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_supabase() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_ANON_KEY)


class SignInBody(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class SignUpBody(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    role: Role = "student"


class CodeBody(BaseModel):
    code: str


def pkce_pair() -> tuple[str, str]:
    verifier = secrets.token_urlsafe(64)
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    return verifier, _b64url(digest)


def _b64url(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")


def session_payload(session: Any, user: Any) -> dict[str, Any]:
    if session is None or user is None:
        raise HTTPException(status_code=401, detail="Authentication failed")
    return {
        "access_token": session.access_token,
        "refresh_token": session.refresh_token,
        "token_type": "bearer",
        "expires_in": getattr(session, "expires_in", None),
        "user": {
            "id": user.id,
            "email": user.email,
            "role": (user.user_metadata or {}).get("role"),
            "user_metadata": user.user_metadata or {},
        },
    }


def auth_error(exc: Exception) -> HTTPException:
    return HTTPException(status_code=400, detail=str(exc) or "Supabase request failed")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/signup")
def signup(body: SignUpBody, supabase: Client = Depends(get_supabase)) -> dict[str, Any]:
    try:
        result = supabase.auth.sign_up(
            {
                "email": body.email,
                "password": body.password,
                "options": {"data": {"role": body.role}},
            }
        )
    except Exception as exc:
        raise auth_error(exc) from exc

    user = result.user
    if user is None:
        raise HTTPException(status_code=400, detail="Could not create account")

    if result.session is None:
        return {
            "needs_email_confirmation": True,
            "user": {"id": user.id, "email": user.email, "role": body.role},
        }

    return session_payload(result.session, user)


@app.post("/auth/signin")
def signin(body: SignInBody, supabase: Client = Depends(get_supabase)) -> dict[str, Any]:
    try:
        result = supabase.auth.sign_in_with_password(
            {"email": body.email, "password": body.password}
        )
    except Exception as exc:
        raise auth_error(exc) from exc

    return session_payload(result.session, user=result.user)


@app.get("/auth/google/start")
def google_start() -> RedirectResponse:
    verifier, challenge = pkce_pair()
    query = urlencode(
        {
            "provider": "google",
            "redirect_to": GOOGLE_OAUTH_REDIRECT,
            "code_challenge": challenge,
            "code_challenge_method": "S256",
            "apikey": SUPABASE_ANON_KEY,
        }
    )
    response = RedirectResponse(url=f"{SUPABASE_URL}/auth/v1/authorize?{query}")
    response.set_cookie(
        key="pkce_verifier",
        value=verifier,
        httponly=True,
        samesite="lax",
        max_age=600,
        path="/",
    )
    return response


@app.post("/auth/google/exchange")
def google_exchange(
    body: CodeBody,
    pkce_verifier: Optional[str] = Cookie(default=None),
    supabase: Client = Depends(get_supabase),
) -> dict[str, Any]:
    if not pkce_verifier:
        raise HTTPException(status_code=400, detail="Missing PKCE verifier cookie. Start Google sign-in from /auth/google/start.")
    try:
        result = supabase.auth.exchange_code_for_session(
            {"auth_code": body.code, "code_verifier": pkce_verifier}
        )
    except Exception as exc:
        raise auth_error(exc) from exc
    return session_payload(result.session, result.user)


@app.get("/auth/me")
def me(
    authorization: Optional[str] = Header(default=None),
    supabase: Client = Depends(get_supabase),
) -> dict[str, Any]:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1]
    try:
        result = supabase.auth.get_user(token)
    except Exception as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc

    user = result.user
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid session")

    profile = None
    try:
        profile_res = (
            supabase.table("profiles").select("*").eq("id", user.id).maybe_single().execute()
        )
        profile = profile_res.data
    except Exception:
        profile = None

    return {
        "user": {
            "id": user.id,
            "email": user.email,
            "role": (user.user_metadata or {}).get("role"),
            "user_metadata": user.user_metadata or {},
        },
        "profile": profile,
    }
