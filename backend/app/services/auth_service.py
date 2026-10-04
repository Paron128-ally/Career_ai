from typing import Any

from app.core.security import user_payload


class AuthService:
    def __init__(self, supabase):
        self.supabase = supabase

    @staticmethod
    def session_payload(session: Any, user: Any) -> dict[str, Any]:
        if session is None or user is None:
            raise ValueError("Authentication failed")
        return {
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "token_type": "bearer",
            "expires_in": getattr(session, "expires_in", None),
            "user": user_payload(user),
        }

    def signup(self, email: str, password: str, role: str) -> dict[str, Any]:
        result = self.supabase.auth.sign_up(
            {
                "email": email,
                "password": password,
                "options": {"data": {"role": role}},
            }
        )
        if result.user is None:
            raise ValueError("Could not create account")
        if result.session is None:
            return {
                "needs_email_confirmation": True,
                "user": {"id": result.user.id, "email": result.user.email, "role": role},
            }
        return self.session_payload(result.session, result.user)

    def signin(self, email: str, password: str) -> dict[str, Any]:
        result = self.supabase.auth.sign_in_with_password(
            {"email": email, "password": password}
        )
        return self.session_payload(result.session, result.user)

    def exchange_google_id_token(self, id_token: str) -> dict[str, Any]:
        result = self.supabase.auth.sign_in_with_id_token(
            {"provider": "google", "token": id_token}
        )
        return self.session_payload(result.session, result.user)

    def exchange_supabase_code(self, code: str, code_verifier: str) -> dict[str, Any]:
        result = self.supabase.auth.exchange_code_for_session(
            {"auth_code": code, "code_verifier": code_verifier}
        )
        return self.session_payload(result.session, result.user)

    def current_user_payload(self, access_token: str) -> dict[str, Any]:
        user = self.supabase.auth.get_user(access_token).user
        if user is None:
            raise ValueError("Invalid session")
        profile = None
        try:
            profile = (
                self.supabase.table("profiles")
                .select("*")
                .eq("id", user.id)
                .maybe_single()
                .execute()
                .data
            )
        except Exception:
            # Profiles are optional until the SQL migration is applied.
            profile = None
        return {"user": user_payload(user), "profile": profile}
