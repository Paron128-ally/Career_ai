# API Contract — AI Career Platform

> **Status:** All endpoints below are **PLANNED**. Only `GET /health` is currently implemented.

---

## Base URL

```
Development: http://localhost:8000
Production:  TBD
```

## Response Format

All responses return JSON.

Success:
```json
{ "data": {...} }
```

Error:
```json
{ "detail": "Error message" }
```

---

## Endpoints

---

### `GET /health`

**Status:** ✅ Implemented

**Purpose:** Confirm the API service is running.

**Response:**
```json
{
  "status": "ok",
  "service": "ai-career-platform"
}
```

**Owner:** System Architect
**Dependencies:** None

---

### `POST /api/auth/login`

**Status:** 🔲 Planned — `feature/backend-auth`

**Purpose:** Authenticate a student and return an access token.

**Request:**
```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "student_id": 1
}
```

**Owner:** Backend Developer
**Dependencies:** `students` table, JWT secret

---

### `GET /api/profile/{student_id}`

**Status:** 🔲 Planned — `feature/backend-profile-api`

**Purpose:** Retrieve a student's profile.

**Path parameter:** `student_id` (integer)

**Response:**
```json
{
  "student_id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "course": "Computer Science",
  "year": 3,
  "career_goal": "Data Scientist",
  "skills": [
    { "skill": "Python", "level": 70 },
    { "skill": "SQL", "level": 40 }
  ]
}
```

**Owner:** Backend Developer
**Dependencies:** Auth, `students` table, `student_skills` table

---

### `POST /api/resume/analyze`

**Status:** 🔲 Planned — `feature/backend-profile-api` + `feature/ai-resume-analysis`

**Purpose:** Upload a student resume and extract skills, education, projects, experience.

**Request:** `multipart/form-data`
```
file: <PDF binary>
student_id: 1
```

**Response:**
```json
{
  "student_id": 1,
  "extracted": {
    "education": ["B.Tech Computer Science, XYZ University"],
    "skills": ["Python", "Machine Learning", "SQL"],
    "projects": ["Sentiment Analysis App"],
    "experience": [],
    "technologies": ["TensorFlow", "Pandas"]
  }
}
```

**Owner:** AI/ML Engineer + Backend Developer
**Dependencies:** AI resume module, `student_skills` table

---

### `GET /api/careers/{student_id}`

**Status:** 🔲 Planned — `feature/backend-career-api` + `feature/ai-career-matching`

**Purpose:** Get ranked career recommendations for a student.

**Path parameter:** `student_id` (integer)

**Response:**
```json
{
  "student_id": 1,
  "recommendations": [
    {
      "career": "Data Scientist",
      "match_score": 78,
      "reason": "Strong Python and statistics background."
    },
    {
      "career": "ML Engineer",
      "match_score": 65,
      "reason": "Good programming skills; needs more ML depth."
    }
  ]
}
```

**Owner:** AI/ML Engineer + Backend Developer
**Dependencies:** Career dataset, `careers` table, `career_skills` table, `student_skills` table

---

### `GET /api/skill-gap/{student_id}`

**Status:** 🔲 Planned — `feature/backend-skill-gap-api` + `feature/ai-skill-gap`

**Purpose:** Return skill gap analysis for the student's target career.

**Path parameter:** `student_id` (integer)

**Query parameter:** `career` (string, optional — defaults to top recommendation)

**Response:**
```json
{
  "student_id": 1,
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

**Owner:** AI/ML Engineer + Backend Developer
**Dependencies:** `student_skills`, `career_skills`, `careers` tables

---

### `GET /api/roadmap/{student_id}`

**Status:** 🔲 Planned — `feature/backend-roadmap-api` + `feature/ai-roadmap`

**Purpose:** Return a personalised learning roadmap.

**Path parameter:** `student_id` (integer)

**Response:**
```json
{
  "student_id": 1,
  "target_career": "Data Scientist",
  "phases": [
    {
      "phase": 1,
      "title": "Foundations",
      "skills": ["SQL", "Statistics"],
      "resources": ["Mode Analytics SQL tutorial", "Khan Academy Statistics"],
      "projects": ["Build a sales analysis dashboard"]
    }
  ]
}
```

**Owner:** AI/ML Engineer + Backend Developer
**Dependencies:** Skill gap result, career dataset

---

### `GET /api/internships/{student_id}`

**Status:** 🔲 Planned — `feature/backend-profile-api`

**Purpose:** Return internship/project recommendations matched to the student's profile and skills.

**Path parameter:** `student_id` (integer)

**Response:**
```json
{
  "student_id": 1,
  "internships": [
    {
      "title": "Data Analyst Intern",
      "company": "TechCo",
      "match_score": 82,
      "required_skills": ["Python", "SQL"],
      "location": "Remote",
      "duration": "3 months",
      "link": "https://example.com/apply"
    }
  ]
}
```

**Owner:** Backend Developer
**Dependencies:** `internships` dataset, `student_skills`

---

### `POST /api/chat`

**Status:** 🔲 Planned — `feature/backend-chat-api` + `feature/ai-gemini-agent`

**Purpose:** Send a message to the AI Career Assistant (Gemini).

**Request:**
```json
{
  "student_id": 1,
  "message": "What skills do I need to become a Data Scientist?"
}
```

**Response:**
```json
{
  "reply": "Based on your profile, you should focus on SQL (gap: 65 points) and Machine Learning (gap: 45 points). Here's what I recommend...",
  "session_id": "abc123"
}
```

**Owner:** AI/ML Engineer + Backend Developer
**Dependencies:** Gemini API (server-side), all other endpoints must be functional

**Security note:** `GEMINI_API_KEY` stays in `backend/.env` — never exposed to the frontend.
