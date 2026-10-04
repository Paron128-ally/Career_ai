from supabase import Client, create_client

from app.core.config import get_settings


def get_supabase_client() -> Client:
    # Use a fresh client per request so one user's auth state cannot be
    # accidentally reused by another request in a long-lived process.
    settings = get_settings()
    return create_client(settings.supabase_url, settings.supabase_anon_key)


def get_supabase() -> Client:
    """FastAPI dependency for the shared Supabase client."""
    return get_supabase_client()
