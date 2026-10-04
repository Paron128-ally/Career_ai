from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routes import (
    assessments,
    assistant,
    auth,
    careers,
    learning,
    opportunities,
    profile,
    progress,
    recommendations,
    reports,
    resumes,
    roadmap,
    skill_gap,
    skills,
    students,
)


settings = get_settings()
app = FastAPI(title="CareerAI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_origin,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

for router in (
    students.router,
    profile.router,
    skills.router,
    assessments.router,
    resumes.router,
    careers.router,
    recommendations.router,
    skill_gap.router,
    roadmap.router,
    learning.router,
    opportunities.router,
    progress.router,
    reports.router,
    assistant.router,
):
    app.include_router(router, prefix="/api/v1")


@app.get("/health", tags=["system"])
def health() -> dict[str, str]:
    return {"status": "ok", "environment": settings.environment}
