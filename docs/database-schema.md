# Database Schema — AI Career Platform

> **Database:** SQLite (MVP)
> **Status:** Schema planned — tables not yet created. Implementation via `feature/backend-database`.

---

## Entity Overview

```
students
  ↓ has many
student_skills ─── skills
  ↓
career_recommendations ─── careers ─── career_skills ─── skills
  ↓
skill_gaps
  ↓
roadmaps ─── roadmap_items
  ↓
progress

internships

chat_sessions
```

---

## Tables

---

### `students`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | Auto-increment |
| `name` | TEXT | NOT NULL | Full name |
| `email` | TEXT | NOT NULL, UNIQUE | Login email |
| `password_hash` | TEXT | NOT NULL | Bcrypt hash |
| `course` | TEXT | | e.g. "Computer Science" |
| `year` | INTEGER | | Academic year |
| `career_goal` | TEXT | | Self-declared career target |
| `created_at` | DATETIME | | Auto-set on insert |

---

### `skills`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `name` | TEXT | NOT NULL, UNIQUE | e.g. "Python" |
| `category` | TEXT | | e.g. "Programming" |

---

### `student_skills`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `student_id` | INTEGER | FK → students | |
| `skill_id` | INTEGER | FK → skills | |
| `level` | INTEGER | 0–100 | Self-assessed or AI-extracted |
| `source` | TEXT | | "self" / "resume" |
| `updated_at` | DATETIME | | Last update time |

---

### `careers`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `name` | TEXT | NOT NULL, UNIQUE | e.g. "Data Scientist" |
| `category` | TEXT | | e.g. "Technology" |
| `description` | TEXT | | Short description |

---

### `career_skills`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `career_id` | INTEGER | FK → careers | |
| `skill_id` | INTEGER | FK → skills | |
| `required_level` | INTEGER | 0–100 | Minimum required proficiency |
| `importance` | TEXT | | "essential" / "preferred" / "bonus" |

---

### `career_recommendations`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `student_id` | INTEGER | FK → students | |
| `career_id` | INTEGER | FK → careers | |
| `match_score` | REAL | 0.0–100.0 | Computed match percentage |
| `reason` | TEXT | | AI/ML explanation |
| `rank` | INTEGER | | 1 = top recommendation |
| `created_at` | DATETIME | | |

---

### `skill_gaps`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `student_id` | INTEGER | FK → students | |
| `career_id` | INTEGER | FK → careers | |
| `skill_id` | INTEGER | FK → skills | |
| `current_level` | INTEGER | 0–100 | Student's current level |
| `required_level` | INTEGER | 0–100 | Career required level |
| `gap` | INTEGER | | required − current |
| `priority` | TEXT | | "high" / "medium" / "low" |

---

### `roadmaps`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `student_id` | INTEGER | FK → students | |
| `career_id` | INTEGER | FK → careers | |
| `created_at` | DATETIME | | |

---

### `roadmap_items`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `roadmap_id` | INTEGER | FK → roadmaps | |
| `phase` | INTEGER | | Phase number (1, 2, 3...) |
| `skill_id` | INTEGER | FK → skills | |
| `resource` | TEXT | | Learning resource URL or name |
| `project_suggestion` | TEXT | | Optional project idea |
| `order` | INTEGER | | Order within phase |

---

### `internships`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `title` | TEXT | | Role title |
| `company` | TEXT | | Company name |
| `required_skills` | TEXT | | JSON list of skill names |
| `career_relevance` | TEXT | | Career category |
| `location` | TEXT | | City or "Remote" |
| `duration` | TEXT | | e.g. "3 months" |
| `link` | TEXT | | Application URL |

---

### `progress`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `student_id` | INTEGER | FK → students | |
| `roadmap_item_id` | INTEGER | FK → roadmap_items | |
| `completed` | BOOLEAN | | |
| `completed_at` | DATETIME | | |

---

### `chat_sessions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | |
| `student_id` | INTEGER | FK → students | |
| `session_id` | TEXT | UNIQUE | UUID |
| `messages` | TEXT | | JSON array of messages |
| `created_at` | DATETIME | | |
| `updated_at` | DATETIME | | |

---

## Notes

- SQLite is appropriate for the hackathon MVP.
- All foreign keys should be enforced with `PRAGMA foreign_keys = ON`.
- Timestamps use ISO 8601 format.
- `messages` in `chat_sessions` is stored as JSON text for simplicity.
- For production, consider PostgreSQL and proper message normalization.
