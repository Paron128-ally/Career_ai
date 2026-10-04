"""Compatibility exports for the structured Supabase database layer."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from app.database.supabase import get_supabase, get_supabase_client

__all__ = ["get_supabase", "get_supabase_client"]
