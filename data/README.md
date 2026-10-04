# AI Career Platform — Data Module

## Overview

This directory contains all career and skills data used by the AI Career Platform.

> **Status:** Foundation scaffold — no real data yet.
> The Data Engineer will populate this directory via `feature/data-*` branches.

---

## Directory Structure

```
data/
├── raw/          ← Original source data (untouched)
├── processed/    ← Cleaned and structured data ready for use
├── schemas/      ← Schema documentation for each dataset
└── README.md
```

---

## Expected Future Datasets

### `careers.csv`

Career records used by the career matching algorithm.

| Field | Type | Description |
|-------|------|-------------|
| `career_id` | integer | Unique identifier |
| `career_name` | string | e.g. "Data Scientist" |
| `category` | string | e.g. "Technology", "Finance" |
| `description` | string | Short career description |

---

### `skills.csv`

Master list of trackable skills.

| Field | Type | Description |
|-------|------|-------------|
| `skill_id` | integer | Unique identifier |
| `skill_name` | string | e.g. "Python", "SQL" |
| `category` | string | e.g. "Programming", "Data Analysis" |

---

### `career_skills.csv`

Maps which skills are required for which careers, and at what level.

| Field | Type | Description |
|-------|------|-------------|
| `career_id` | integer | FK → careers.csv |
| `skill_id` | integer | FK → skills.csv |
| `required_level` | integer | 0–100 scale |
| `importance` | string | "essential" / "preferred" / "bonus" |

---

### `internships.csv`

Internship and project recommendations.

| Field | Type | Description |
|-------|------|-------------|
| `internship_id` | integer | Unique identifier |
| `title` | string | Role title |
| `company` | string | Company name |
| `career_relevance` | string | Relevant career categories |
| `required_skills` | string | Comma-separated skill names |
| `location` | string | City / Remote |
| `duration` | string | e.g. "3 months" |
| `link` | string | Application URL |

---

## Data Pipeline (Future)

```
raw/           ← Data Engineer deposits source files here
  ↓
processed/     ← Cleaned, deduplicated, standardised CSVs
  ↓
SQLite DB      ← Backend seeds the database from processed/
  ↓
AI/ML Engine   ← Uses DB tables for matching and gap analysis
```

---

## Branch Convention

Data feature branches use the prefix: `feature/data-*`

Examples:
- `feature/data-career-dataset`
- `feature/data-skill-dataset`
- `feature/data-cleaning`
- `feature/data-database-seed`
