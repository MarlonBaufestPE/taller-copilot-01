# JWT Authentication Service

FastAPI-based Web API that implements JWT (JSON Web Token) authentication. Provides endpoints to issue short-lived access tokens and long-lived refresh tokens.

---

## ⚠️ Security Notice (Production Use)

This service is a **demonstration** project. Before deploying to production:

1. **Set a strong `SECRET_KEY`**: Generate one with `openssl rand -hex 32` and pass it as the `SECRET_KEY` environment variable. The application prints a warning to stderr if the default key is used.
2. **Replace the hardcoded credentials**: The `admin` / `admin123` account exists only for demo purposes. Replace it with a real user store (database, LDAP, etc.).
3. **Use HTTPS**: Always serve the API behind TLS in production.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Running Locally with Poetry](#running-locally-with-poetry)
- [Running with Docker](#running-with-docker)
- [API Reference](#api-reference)
- [Usage Examples (curl)](#usage-examples-curl)
- [Running Tests](#running-tests)

---

## Features

- **Login endpoint** – validates credentials and returns an `access_token` (expires in **300 seconds**) and a `refresh_token` (expires in 7 days).
- **Refresh endpoint** – exchanges a valid refresh token for a new access token.
- Built with **FastAPI** and documented automatically at `/docs` (Swagger UI) and `/redoc`.
- Dependency management via **Poetry**.
- Containerised with **Docker** and orchestrated with **docker-compose**.

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py        # JWT creation/validation and user authentication logic
│   ├── main.py        # FastAPI application and route definitions
│   └── models.py      # Pydantic request/response models
├── tests/
│   ├── __init__.py
│   └── test_auth.py   # Pytest test suite
├── Dockerfile
├── pyproject.toml
└── README.md          ← you are here
```

---

## Requirements

| Tool | Version |
|------|---------|
| Python | ≥ 3.11 |
| Poetry | ≥ 1.8 |
| Docker | ≥ 24 (optional) |
| docker compose | ≥ 2 (optional) |

---

## Running Locally with Poetry

```bash
# From the repository root
cd backend

# Install dependencies
poetry install

# Start the development server
poetry run uvicorn app.main:app --reload --port 8000
```

The API is now available at **http://localhost:8000**.  
Interactive documentation: **http://localhost:8000/docs**

---

## Running with Docker

### Using docker compose (recommended)

```bash
# From the repository root
docker compose up --build
```

The service starts on **http://localhost:8000**.

### Using Docker directly

```bash
# From the backend/ directory
docker build -t jwt-backend .
docker run -p 8000:8000 jwt-backend
```

---

## API Reference

### `GET /health`

Liveness probe.

**Response 200**
```json
{ "status": "ok" }
```

---

### `POST /auth/login`

Authenticate and obtain JWT tokens.

**Request body**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response 200**
```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Response 401** – incorrect credentials.

---

### `POST /auth/refresh`

Exchange a refresh token for a new access token.

**Request body**
```json
{
  "refresh_token": "<jwt>"
}
```

**Response 200**
```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Response 401** – invalid or expired refresh token.

---

## Usage Examples (curl)

### Login

```bash
curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | python3 -m json.tool
```

### Refresh access token

```bash
# Replace <refresh_token> with the value returned by /auth/login
curl -s -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<refresh_token>"}' | python3 -m json.tool
```

---

## Running Tests

```bash
cd backend
poetry install
poetry run pytest -v
```

Expected output:

```
tests/test_auth.py::test_health_check PASSED
tests/test_auth.py::test_login_success PASSED
tests/test_auth.py::test_login_wrong_password PASSED
tests/test_auth.py::test_login_unknown_user PASSED
tests/test_auth.py::test_refresh_token_success PASSED
tests/test_auth.py::test_refresh_token_invalid PASSED
tests/test_auth.py::test_refresh_token_rejects_access_token PASSED
7 passed
```
