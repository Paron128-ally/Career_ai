# AI Career Platform

> **An AI-powered personalised career and skill-gap assessment platform for students.**

---

## Problem

Students graduating from college face a critical challenge: they don't know which careers match their skills, what skills they're missing, or how to close those gaps. Career counselling is scarce, generic, and not personalised.

## Solution

The AI Career Platform analyses a student's existing skills and resume, recommends the most suitable careers, calculates precise skill gaps, and generates a personalised learning roadmap — with an AI Career Assistant to guide them through every step.

---

## Core Workflow

```
Student Profile / Resume
         ↓
AI Skill Extraction
         ↓
Career Recommendation
         ↓
Skill Gap Analysis
         ↓
Personalised Learning Roadmap
         ↓
Internship / Project Recommendations
         ↓
Progress Tracking
         ↓
AI Career Assistant
```

---

## Planned Features

| Feature | Status |
|---------|--------|
| Student profile | 🔲 Planned |
| Resume upload & AI skill extraction | 🔲 Planned |
| Career recommendation (AI/ML scoring) | 🔲 Planned |
| Skill gap analysis | 🔲 Planned |
| Personalised learning roadmap | 🔲 Planned |
| Internship recommendations | 🔲 Planned |
| Progress tracking | 🔲 Planned |
| AI Career Assistant (Gemini) | 🔲 Planned |
| Authentication | 🔲 Planned |

**Foundation (complete):**
- ✅ Project structure
- ✅ Backend foundation (`GET /health`)
- ✅ Frontend foundation (Vite + React, builds successfully)
- ✅ GitHub Actions CI
- ✅ Documentation
- ✅ GitHub issue and PR templates

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React · Vite · JavaScript |
| Backend | Python · FastAPI · Uvicorn |
| Database | SQLite (MVP) |
| AI / ML | Pandas · NumPy · scikit-learn |
| Conversational AI | Google Gemini API |
| Testing | pytest · httpx |
| CI | GitHub Actions |
| Version Control | Git · GitHub |

---

## Architecture

```
               ┌──────────────────────┐
               │       FRONTEND       │
               │   React + Vite       │
               └──────────┬───────────┘
                          │ REST / JSON
               ┌──────────▼───────────┐
               │       FASTAPI        │
               │  Auth / Profile      │
               │  Career / Skill Gap  │
               │  Roadmap / Chat      │
               └────┬────────────┬────┘
                    │            │
          ┌─────────▼──┐  ┌──────▼────────┐
          │   SQLite   │  │    AI / ML    │
          └────────────┘  │  + Gemini     │
                          └───────────────┘
```

See [`docs/architecture.md`](docs/architecture.md) for the full architecture.

---

## Folder Structure

```
ai-career-platform/
├── frontend/          ← React + Vite application
├── backend/           ← FastAPI application
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── database/
│   │   └── utils/
│   └── tests/
├── ai/                ← AI / ML modules
│   ├── resume/
│   ├── career_matching/
│   ├── skill_gap/
│   ├── roadmap/
│   └── gemini/
├── data/              ← Career / skill datasets
│   ├── raw/
│   ├── processed/
│   └── schemas/
├── docs/              ← Project documentation
├── tests/             ← Integration & E2E tests
├── .github/           ← PR template, issue templates, CI
├── .gitignore
├── .env.example
└── LICENSE
```

---

## Team Roles

| Role | Responsibility |
|------|---------------|
| System Architect | Architecture, integration, deployment, CI/testing |
| UI/UX Designer | Design system, UX flows, Stitch UI |
| Data Engineer | Career/skill datasets, data cleaning, DB seed |
| AI/ML Engineer | Career matching, skill gap, resume, roadmap, Gemini |
| Frontend Developer | React pages, components, API integration |
| Backend Developer | FastAPI, SQLite, auth, REST APIs |

---

## Local Development Setup

### Quick Start

**Backend:**
```bash
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows PowerShell
source .venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

See [`docs/development-setup.md`](docs/development-setup.md) for the full guide.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
GEMINI_API_KEY=          # Gemini API key (server-side only)
DATABASE_URL=            # SQLite path
SECRET_KEY=              # JWT signing secret
```

> **Security:** Never commit `.env`. The Gemini API key must never appear in the frontend.

---

## Git Branching Workflow

```
feature/*
    ↓ Pull Request
develop        ← integration branch
    ↓ Pull Request
main           ← stable / demo-ready
```

### Branch naming

```
feature/ai-*          ← AI/ML Engineer
feature/backend-*     ← Backend Developer
feature/frontend-*    ← Frontend Developer
feature/data-*        ← Data Engineer
feature/ui-*          ← UI/UX Designer
feature/setup-*       ← System Architect
```

### Workflow

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<area>-<task>
# implement, test
git add .
git commit -m "feat: describe change"
git push -u origin feature/<area>-<task>
# Open PR → develop
```

See [`docs/team-workflow.md`](docs/team-workflow.md) for the full guide.

---

## API

Docs available at: **http://localhost:8000/docs** (when backend is running)

Health check: `GET /health` → `{"status":"ok","service":"ai-career-platform"}`

See [`docs/api-contract.md`](docs/api-contract.md) for all planned endpoints.

---

## Documentation

| Document | Description |
|----------|-------------|
| [`docs/architecture.md`](docs/architecture.md) | System architecture |
| [`docs/api-contract.md`](docs/api-contract.md) | REST API contract |
| [`docs/database-schema.md`](docs/database-schema.md) | Database schema |
| [`docs/ai-design.md`](docs/ai-design.md) | AI/ML design |
| [`docs/team-workflow.md`](docs/team-workflow.md) | Git workflow and team roles |
| [`docs/development-setup.md`](docs/development-setup.md) | Local setup guide |
