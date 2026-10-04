# AI Career Platform — AI / ML Module

## Overview

This module contains all AI and machine learning components for the AI Career Platform.

> **Status:** Foundation scaffold — no AI functionality implemented yet.
> All features listed below are **planned** for future feature branches.

---

## Architecture Principle

**Do NOT treat Gemini as the entire application.**

The system separates three distinct concerns:

```
1. Application Data (SQLite via FastAPI)
   → Real student profiles, skills, career records

2. Deterministic AI/ML Logic (this module)
   → Scoring, matching, gap calculation

3. Gemini Conversational Layer (gemini/)
   → Explains results, reasons, answers questions
   → Gets real data from backend tools — does NOT hallucinate student scores
```

---

## Module Structure

```
ai/
├── models/           ← Pydantic schemas for AI input/output
├── services/         ← Orchestration layer (calls resume/, career_matching/, etc.)
├── prompts/          ← Prompt templates for Gemini
├── schemas/          ← Shared data schemas
├── resume/           ← Resume parsing and skill extraction
├── career_matching/  ← Career recommendation and scoring
├── skill_gap/        ← Skill gap calculation
├── roadmap/          ← Learning roadmap generation
└── gemini/           ← Gemini API integration and function-calling tools
```

---

## Future Responsibilities

### `resume/` — Resume Analysis

**Branch:** `feature/ai-resume-analysis`

**Input:** Student resume (PDF / text)

**Output:**
```json
{
  "education": [...],
  "skills": ["Python", "SQL", "Machine Learning"],
  "projects": [...],
  "experience": [...],
  "technologies": [...]
}
```

---

### `career_matching/` — Career Recommendation

**Branch:** `feature/ai-career-matching`

**Input:**
- Student profile
- Student skills (with proficiency levels)
- Career requirements (from career dataset)

**Output:**
```json
[
  {
    "career": "Data Scientist",
    "match_score": 78,
    "reason": "Strong Python and statistics background."
  }
]
```

**Important:** Match scores come from deterministic scoring logic, not from asking Gemini to guess.

---

### `skill_gap/` — Skill Gap Analysis

**Branch:** `feature/ai-skill-gap`

**Input:**
- Student skills (current levels)
- Target career required skills

**Output:**
```json
{
  "target_career": "Data Scientist",
  "gaps": [
    {
      "skill": "SQL",
      "current": 20,
      "required": 85,
      "gap": 65,
      "priority": "high"
    }
  ]
}
```

---

### `roadmap/` — Learning Roadmap Generation

**Branch:** `feature/ai-roadmap`

**Input:**
- Target career
- Skill gaps (from skill_gap module)

**Output:**
- Ordered learning phases
- Skills to acquire per phase
- Recommended resources and projects per skill

---

### `gemini/` — Gemini AI Assistant Integration

**Branch:** `feature/ai-gemini-agent`

Gemini acts as the **conversational reasoning layer**.

Gemini has tool/function access to real application data:

```python
get_student_profile()        # → Real profile from DB
get_career_recommendations() # → Real scored recommendations
get_skill_gap()              # → Real computed gaps
get_learning_roadmap()       # → Real generated roadmap
get_internships()            # → Real internship recommendations
```

**Gemini must NOT invent student-specific scores.**
All factual data is retrieved from the backend via these tools.

**Security:** `GEMINI_API_KEY` lives in `backend/.env` — **never in the frontend**.

---

## Technology Stack

| Library | Purpose |
|---------|---------|
| Python | Core language |
| Pandas | Data manipulation |
| NumPy | Numerical operations |
| scikit-learn | Career matching / scoring |
| google-generativeai | Gemini API |

> These dependencies will be added to `backend/requirements.txt` when the AI modules are implemented.
