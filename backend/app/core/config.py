import json
import os
from functools import lru_cache
from pathlib import Path
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    supabase_url: str
    supabase_anon_key: str
    frontend_url: str = "http://localhost:5173"
    backend_url: str = "http://localhost:8000"
    supabase_oauth_redirect: Optional[str] = None
    google_oauth_redirect: Optional[str] = None
    google_oauth_client_file: Optional[str] = None
    google_client_id: Optional[str] = None
    google_client_secret: Optional[str] = None
    gemini_api_key: Optional[str] = None
    ai_model: str = "gemini-2.0-flash"
    database_url: Optional[str] = None
    environment: str = "development"

    model_config = SettingsConfigDict(
        env_file=BACKEND_DIR / ".env",
        env_file_encoding="utf-8-sig",
        extra="ignore",
        case_sensitive=False,
    )

    @property
    def frontend_origin(self) -> str:
        return self.frontend_url.rstrip("/")

    @property
    def api_origin(self) -> str:
        return self.backend_url.rstrip("/")

    @property
    def supabase_redirect(self) -> str:
        return self.supabase_oauth_redirect or f"{self.frontend_origin}/auth/callback"

    @property
    def google_redirect(self) -> str:
        return self.google_oauth_redirect or f"{self.api_origin}/auth/google/callback"

    @property
    def cookie_secure(self) -> bool:
        return self.frontend_origin.startswith("https://")

    @property
    def google_credentials(self) -> tuple[Optional[str], Optional[str]]:
        client_id = self.google_client_id
        client_secret = self.google_client_secret
        credentials_file = self.google_oauth_client_file

        if credentials_file and (not client_id or not client_secret):
            try:
                with open(os.path.expandvars(credentials_file), encoding="utf-8") as file:
                    document = json.load(file)
                config = document.get("web") or document.get("installed") or {}
                client_id = client_id or config.get("client_id")
                client_secret = client_secret or config.get("client_secret")
            except (OSError, json.JSONDecodeError):
                pass

        return client_id, client_secret


@lru_cache
def get_settings() -> Settings:
    return Settings()
