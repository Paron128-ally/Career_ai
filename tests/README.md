# tests — Root Integration Tests

## Purpose

This directory is reserved for **integration and end-to-end tests** that span multiple layers of the application:
- Frontend ↔ Backend
- Backend ↔ AI module
- Full user flow tests

> **Status:** Placeholder — tests will be added via `feature/testing` and `feature/integration` branches.

## Structure (future)

```
tests/
├── integration/      ← API + AI integration tests
├── e2e/              ← End-to-end user flow tests
└── README.md
```

## Unit Tests

Backend-specific unit and API tests are under:

```
backend/tests/
```

## Running integration tests (future)

```bash
# From project root
pytest tests/ -v
```

## Branch

Integration test work belongs on: `feature/testing` or `feature/integration`
