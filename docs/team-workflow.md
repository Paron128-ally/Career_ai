# Team Workflow — AI Career Platform

## Team Roles

| Role | Responsibility |
|------|---------------|
| **System Architect** | Architecture, integration, deployment, testing, coordinating all areas |
| **UI/UX Designer** | Design system, UX flows, visual consistency, screen specs |
| **Data Engineer** | Career/skill/internship datasets, data cleaning, DB seed data |
| **AI/ML Engineer** | Career matching, skill gap, resume analysis, roadmap, Gemini agent |
| **Frontend Developer** | React UI, pages, components, API integration |
| **Backend Developer** | FastAPI, SQLite, auth, REST APIs, backend integration |

---

## Branch Architecture

```
main
│  └─ Stable / demo-ready
│
└── develop
    │  └─ Integration branch — all completed work lands here
    │
    ├── feature/ai-*
    ├── feature/backend-*
    ├── feature/frontend-*
    ├── feature/data-*
    ├── feature/ui-*
    └── feature/setup-* / feature/testing-* / feature/deployment-*
```

---

## Branch Ownership by Area

| Role | Branch prefix |
|------|--------------|
| System Architect | `feature/setup-*`, `feature/deployment-*`, `feature/testing-*`, `feature/integration-*` |
| UI/UX Designer | `feature/ui-*` |
| Data Engineer | `feature/data-*` |
| AI/ML Engineer | `feature/ai-*` |
| Frontend Developer | `feature/frontend-*` |
| Backend Developer | `feature/backend-*` |

> These are **prefixes** — not permanent branches.
> Branches are created per **task**, not per person.

---

## Branch Naming Convention

```
feature/<area>-<short-description>
```

**Examples — AI/ML:**
```
feature/ai-career-matching
feature/ai-skill-gap
feature/ai-resume-analysis
feature/ai-roadmap
feature/ai-gemini-agent
```

**Examples — Backend:**
```
feature/backend-auth
feature/backend-profile-api
feature/backend-career-api
feature/backend-skill-gap-api
feature/backend-roadmap-api
feature/backend-chat-api
feature/backend-database
```

**Examples — Frontend:**
```
feature/frontend-dashboard
feature/frontend-profile
feature/frontend-resume-upload
feature/frontend-career-results
feature/frontend-skill-gap
feature/frontend-roadmap
feature/frontend-internships
feature/frontend-progress
feature/frontend-chat
feature/frontend-api-integration
```

**Examples — Data:**
```
feature/data-career-dataset
feature/data-skill-dataset
feature/data-cleaning
feature/data-database-seed
```

**Examples — UI/UX:**
```
feature/ui-design-system
feature/ui-dashboard
feature/ui-skill-gap
feature/ui-roadmap
```

**Examples — System/DevOps:**
```
feature/setup-ci
feature/testing
feature/deployment
feature/integration
```

---

## Development Workflow

Every developer follows this workflow for every task:

```
1. Pull latest develop
2. Create feature branch from develop
3. Implement one focused task
4. Test locally (backend tests, frontend build)
5. Commit with conventional message
6. Push feature branch
7. Open Pull Request → targeting develop
8. Another team member reviews
9. Fix review comments if any
10. Merge into develop
11. Delete the feature branch
```

### Commands

```bash
# Step 1 — Update local develop
git checkout develop
git pull origin develop

# Step 2 — Create feature branch
git checkout -b feature/ai-career-matching

# Step 3-4 — Implement and test locally

# Step 5 — Commit
git add .
git commit -m "feat: implement career matching scoring"

# Step 6 — Push
git push -u origin feature/ai-career-matching

# Step 7 — Open PR on GitHub targeting develop
# Step 9 — After review, merge
# Step 11 — Delete branch
git branch -d feature/ai-career-matching
git push origin --delete feature/ai-career-matching
```

---

## Commit Message Convention

Use conventional commit prefixes:

| Prefix | Use for |
|--------|---------|
| `feat:` | New features or functionality |
| `fix:` | Bug fixes |
| `docs:` | Documentation changes |
| `refactor:` | Code refactoring (no behaviour change) |
| `test:` | Adding or updating tests |
| `chore:` | Setup, config, tooling, CI |

**Examples:**
```
feat: add career matching service
feat: add skill gap API endpoint
fix: handle missing student profile gracefully
docs: update API contract
test: add health endpoint tests
chore: initialize project architecture
```

---

## Pull Request Rules

- PRs must **target `develop`** — never `main`
- Keep PRs small and focused on one task
- Include the related GitHub issue number
- At least 1 team member must review and approve
- CI must pass before merging
- Delete the feature branch after merging
- Do not mix unrelated work into one PR

---

## Branch Protection (Manual — GitHub Web)

After the CI workflow is passing, configure branch protection manually:

### main

Go to: **Settings → Branches → Add rule → `main`**

Recommended:
- [x] Require pull request before merging
- [x] Require at least 1 approving review
- [x] Require status checks to pass (select the CI workflow)
- [x] Restrict direct pushes

### develop

Go to: **Settings → Branches → Add rule → `develop`**

Recommended:
- [x] Require pull request before merging
- [x] Require status checks to pass

---

## Adding Collaborators (Manual — GitHub Web)

Go to: **Settings → Collaborators → Add people**

Add each team member by their GitHub username.

---

## GitHub Project Board (Manual — GitHub Web)

Go to the **Projects** tab → **New Project** → Create with columns:

```
Backlog → Todo → In Progress → Review → Testing → Done
```

Create GitHub Issues for each task and assign them to team members.

---

## CI Workflow

The CI workflow (`.github/workflows/ci.yml`) runs on every PR and push to `develop` or `main`.

It:
1. Runs all backend tests (`pytest`)
2. Builds the frontend (`npm run build`)

Both must pass. A failing CI blocks merge.

---

## Correct Order for Branch Protection Setup

```
1. Create CI workflow  ← DONE ✅
2. Push to develop — CI runs on GitHub
3. Confirm the CI status check appears in GitHub
4. Configure branch protection — require that status check
```

Do NOT add a branch protection rule requiring a CI check that doesn't exist yet.

---

## Security Rules

- **Never commit `.env`** — it is gitignored
- **Never put `GEMINI_API_KEY` in the frontend**
- **Never commit passwords, tokens, or API keys**
- Use `.env.example` as the template — fill in real values in local `.env`
- Review PRs for accidental secret commits
