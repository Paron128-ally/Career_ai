# Development Setup — AI Career Platform

> Verified environment: Python 3.14.6 · Node 26.4.0 · npm 11.17.0 · Git 2.55

---

## Prerequisites

Ensure the following are installed:

| Tool | Minimum version | Install |
|------|----------------|---------|
| Git | 2.x | https://git-scm.com |
| Python | 3.11+ | https://python.org |
| Node | 18+ | https://nodejs.org |
| npm | 9+ | Bundled with Node |

---

## 1. Clone the Repository

```bash
git clone https://github.com/panthu13147/ai-career-platform.git
cd ai-career-platform
```

---

## 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
GEMINI_API_KEY=your_gemini_key_here
DATABASE_URL=sqlite:///./ai_career_platform.db
SECRET_KEY=your_random_secret_key_here
```

> **Do NOT commit `.env` to Git.** It is gitignored.

---

## 3. Backend Setup

```bash
cd backend
```

### Create virtual environment

```bash
python -m venv .venv
```

### Activate virtual environment

**Windows (PowerShell):**
```powershell
.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
.venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
source .venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Start the backend

```bash
uvicorn app.main:app --reload
```

Backend will be available at: **http://localhost:8000**

- Interactive API docs: http://localhost:8000/docs
- Health check: http://localhost:8000/health

### Run backend tests

```bash
pytest tests/ -v
```

Expected output:
```
tests/test_health.py::TestHealthEndpoint::test_health_returns_200 PASSED
tests/test_health.py::TestHealthEndpoint::test_health_returns_correct_json PASSED
tests/test_health.py::TestHealthEndpoint::test_health_content_type_is_json PASSED
tests/test_health.py::TestRootEndpoint::test_root_returns_200 PASSED
tests/test_health.py::TestRootEndpoint::test_root_includes_service_name PASSED
```

---

## 4. Frontend Setup

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### Production build

```bash
npm run build
```

---

## 5. Running Both Together

Open two terminal windows:

**Terminal 1 — Backend:**
```bash
cd backend
.venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 6. Git Workflow

For every new task:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<area>-<task>

# ... implement and test ...

git add .
git commit -m "feat: describe what you did"
git push -u origin feature/<area>-<task>
# Open Pull Request on GitHub targeting develop
```

---

## 7. Python Version Note

The foundation was built and tested with Python **3.14.6**.

However, the CI pipeline uses Python **3.11** (the latest stable release with broad library compatibility).

When future AI/ML libraries are added (Pandas, NumPy, scikit-learn, google-generativeai), use a Python 3.11 virtual environment for best compatibility:

```bash
# If you have pyenv or multiple Python versions
python3.11 -m venv .venv
```

---

## 8. Troubleshooting

### `uvicorn` not found

Ensure you have activated the virtual environment before running commands:
```bash
.venv\Scripts\Activate.ps1   # Windows
source .venv/bin/activate     # macOS/Linux
```

### `npm run dev` port conflict

If port 5173 is in use, Vite will try 5174. Check the terminal output for the actual URL.

### PowerShell execution policy error

If you see an error about script execution policy on Windows:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### pytest import errors

Run pytest from the `backend/` directory (not from the root):
```bash
cd backend
pytest tests/ -v
```
