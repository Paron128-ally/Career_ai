"""Compatibility entry point for the structured CareerAI backend."""

import sys
from pathlib import Path

# Support both `uvicorn main:app` from backend/ and
# `uvicorn backend.main:app` from the project root.
sys.path.insert(0, str(Path(__file__).resolve().parent))

from app.main import app

__all__ = ["app"]
