# CareerAI backend

The backend is organized by domain so auth, Supabase access, business logic, and future AI integrations stay separate.

## Run locally

```powershell
cd backend
uvicorn main:app --reload
```

The equivalent project-root command is:

```powershell
uvicorn app.main:app --reload
```

The existing frontend auth URLs remain available under `/auth/*`. Domain APIs are protected and live under `/api/v1/*`.

## AI extension point

AI orchestration lives under `app/ai/`, while `app/services/assistant_service.py` owns the application contract. Add a provider implementation in `app/ai/gemini/client.py` or a new provider adapter without changing route handlers or frontend contracts.
