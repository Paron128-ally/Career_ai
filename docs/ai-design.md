# AI Design — AI Career Platform

## Guiding Principle

**The AI layer is NOT the entire application.**

The system separates three distinct concerns:

| Layer | Responsibility |
|-------|---------------|
| Application data (SQLite) | Student profiles, skill records, career requirements |
| Deterministic AI/ML logic | Scoring, matching, gap calculation |
| Gemini conversational AI | Explains results, reasons, answers questions |

Student-specific facts (scores, skill levels, career matches) **come from application data**, not from asking Gemini to guess them.

---

## Module Architecture

```
ai/
├── resume/           ← Extracts structured data from resumes
├── career_matching/  ← Scores and ranks careers for a student
├── skill_gap/        ← Computes skill gaps vs career requirements
├── roadmap/          ← Generates ordered learning plans from gaps
├── gemini/           ← Gemini API integration + function-calling tools
├── services/         ← Orchestration (calls modules in correct order)
├── schemas/          ← Shared Pydantic schemas for AI I/O
├── prompts/          ← Prompt templates for Gemini
└── models/           ← Pydantic models for AI data structures
```

---

## Resume Analysis

**Branch:** `feature/ai-resume-analysis`

**What it does:**
Parses a student's resume (PDF/text) and extracts structured information.

**Input:**
```
Resume file (PDF or text)
```

**Output:**
```json
{
  "education": ["B.Tech Computer Science, XYZ University, 2024"],
  "skills": ["Python", "SQL", "Machine Learning"],
  "projects": ["Customer Churn Prediction", "Sentiment Analysis"],
  "experience": ["Data Analyst Intern — ABC Corp, 2023"],
  "technologies": ["TensorFlow", "Pandas", "NumPy"]
}
```

**Planned approach:**
- PDF text extraction
- NLP-based skill/entity extraction
- Gemini may assist with extraction quality where rules-based parsing is insufficient

---

## Career Recommendation

**Branch:** `feature/ai-career-matching`

**What it does:**
Scores and ranks careers based on student skills vs career requirements.

**Input:**
- Student skill profile (skill name → current level, 0–100)
- Career requirements (career → skill → required level)

**Output:**
```json
[
  {
    "career": "Data Scientist",
    "match_score": 78.5,
    "reason": "Strong Python base; SQL and ML gaps are addressable."
  }
]
```

**Planned approach:**
- Weighted cosine similarity between student skill vector and career requirement vector
- Importance weighting ("essential" skills weighted higher)
- Scores are computed deterministically — Gemini does not generate scores

---

## Skill Gap Analysis

**Branch:** `feature/ai-skill-gap`

**What it does:**
For a given target career, computes the gap between current student skills and required career skills.

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
    },
    {
      "skill": "Machine Learning",
      "current": 30,
      "required": 75,
      "gap": 45,
      "priority": "medium"
    }
  ]
}
```

**Priority logic (planned):**
- `gap > 50` AND `importance = essential` → high
- `gap > 30` OR `importance = preferred` → medium
- Otherwise → low

---

## Learning Roadmap Generation

**Branch:** `feature/ai-roadmap`

**What it does:**
Converts skill gaps into an ordered, phased learning plan.

**Input:**
- Target career
- Skill gap list (with priorities)

**Output:**
```json
{
  "target_career": "Data Scientist",
  "phases": [
    {
      "phase": 1,
      "title": "Foundations",
      "skills": ["SQL", "Statistics"],
      "resources": ["Mode Analytics SQL", "Khan Academy Statistics"],
      "projects": ["Build a sales analysis dashboard"]
    },
    {
      "phase": 2,
      "title": "Core AI/ML",
      "skills": ["Machine Learning", "Python (Advanced)"],
      "resources": ["fast.ai", "Kaggle Learn"],
      "projects": ["Predict customer churn"]
    }
  ]
}
```

**Planned approach:**
- Phase 1: address "high" priority gaps
- Phase 2: address "medium" priority gaps
- Phase 3: address "low" / "preferred" gaps
- Gemini may be used to suggest specific resources and project ideas

---

## Gemini AI Assistant

**Branch:** `feature/ai-gemini-agent`

### Role

Gemini is the **conversational reasoning and explanation layer**.

It does NOT replace the ML scoring logic.
It reads real data from the backend and explains, reasons, and converses.

### Function-Calling Tools (planned)

Gemini will have access to these backend tool functions:

```python
get_student_profile(student_id: int) -> dict
get_career_recommendations(student_id: int) -> list
get_skill_gap(student_id: int, career: str) -> dict
get_learning_roadmap(student_id: int) -> dict
get_internships(student_id: int) -> list
```

These functions call the FastAPI backend and return real persisted data.

### Example Interaction

```
Student: "Why is Data Scientist my top recommendation?"

Gemini internally calls: get_career_recommendations(student_id=1)
→ Returns: [{"career": "Data Scientist", "match_score": 78.5, "reason": "..."}]

Gemini responds: "Based on your current Python and statistics skills, Data Scientist
has your highest match score of 78.5%. Your main gaps are SQL and ML depth."
```

### Security

- `GEMINI_API_KEY` is stored in `backend/.env`
- The key is **never** passed to or used in the frontend
- All Gemini calls are made server-side through the FastAPI backend
- The frontend communicates with `POST /api/chat` only

---

## Prompt Templates

Prompt templates will be stored in `ai/prompts/` as `.txt` or `.py` files.

They will be versioned so prompt improvements can be tracked via Git.

Examples (future):
- `resume_extraction_prompt.txt`
- `career_explanation_prompt.txt`
- `roadmap_resource_prompt.txt`
- `assistant_system_prompt.txt`

---

## Testing Strategy

| Test type | Location | Branch |
|-----------|---------|--------|
| Resume extraction unit tests | `backend/tests/` | `feature/ai-resume-analysis` |
| Career matching unit tests | `backend/tests/` | `feature/ai-career-matching` |
| Skill gap calculation tests | `backend/tests/` | `feature/ai-skill-gap` |
| Gemini integration tests | `backend/tests/` | `feature/ai-gemini-agent` |
| Recommendation quality tests | `backend/tests/` | `feature/testing` |
