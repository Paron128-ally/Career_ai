# Architecture — AI Career Platform

## System Overview

The AI Career Platform is built as a layered architecture separating the frontend, API, business logic, AI/ML, and database.

```
                    ┌─────────────────────────┐
                    │        FRONTEND         │
                    │   React + Stitch UI     │
                    │   Vite · JavaScript     │
                    └──────────┬──────────────┘
                               │
                         REST / JSON
                               │
                    ┌──────────▼──────────────┐
                    │         FASTAPI         │
                    │                         │
                    │  Auth                   │
                    │  Profile API            │
                    │  Career API             │
                    │  Skill Gap API          │
                    │  Roadmap API            │
                    │  Chat/Gemini API        │
                    └──────┬──────────┬───────┘
                           │          │
               ┌───────────▼──┐  ┌────▼────────────────┐
               │   SQLite DB  │  │      AI / ML         │
               │              │  │                      │
               │  students    │  │  resume/             │
               │  skills      │  │  career_matching/    │
               │  careers     │  │  skill_gap/          │
               │  roadmaps    │  │  roadmap/            │
               │  progress    │  │  gemini/             │
               └──────────────┘  └──────────────────────┘
```

---

## Layer Responsibilities

### Frontend (React + Vite)

- All student-facing UI
- Communicates with FastAPI via REST/JSON
- **Never** holds or uses the Gemini API key
- Consumes structured data returned by the backend

### FastAPI Backend

- Central API gateway
- Handles authentication and authorization
- Exposes REST endpoints for all features
- Orchestrates communication between:
  - SQLite database (persistent data)
  - AI/ML module (processing and recommendations)
  - Gemini (conversational AI, via server-side key)
- Returns only structured, validated JSON responses

### SQLite Database

- Persistent storage for the hackathon MVP
- Stores: students, profiles, skills, careers, career requirements, recommendations, roadmaps, progress, chat sessions
- Accessed only through the FastAPI backend

### AI / ML Module

- **Deterministic scoring** (career matching, skill gap calculation)
- Resume skill extraction
- Roadmap generation based on gaps
- Separate from conversational AI (Gemini)

### Gemini Conversational Layer

- Acts as the reasoning and conversation layer
- Calls backend tool functions to retrieve real student data
- **Does NOT invent or hallucinate student-specific scores**
- Explains recommendations, answers career questions
- All API calls are server-side (key stays in `.env`)

---

## Data Flow — Career Recommendation

```
Student uploads resume
         ↓
Backend → AI/ML: extract skills from resume
         ↓
Skills stored in SQLite
         ↓
Backend → AI/ML: match skills against career requirements
         ↓
Career match scores calculated (deterministic)
         ↓
Recommendations stored in SQLite
         ↓
Frontend fetches GET /api/careers/{student_id}
         ↓
Student views ranked career cards
         ↓
Student asks Gemini: "Why is Data Scientist #1?"
         ↓
Gemini calls get_career_recommendations() → gets real scores
         ↓
Gemini explains based on real data (no hallucination)
```

---

## Security Design

| Concern | Solution |
|---------|---------|
| Gemini API key | Server-side `.env` only — never in frontend |
| Auth tokens | JWT, stored in httpOnly cookies (planned) |
| `.env` file | Gitignored — never committed |
| API secrets | Never logged or returned in API responses |

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, JavaScript |
| Backend | Python, FastAPI, Uvicorn |
| Database | SQLite (MVP) |
| AI/ML | Pandas, NumPy, scikit-learn |
| Conversational AI | Google Gemini API |
| Testing | pytest, httpx (backend), Vite build (frontend) |
| CI | GitHub Actions |
| Version Control | Git, GitHub |
