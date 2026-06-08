# FlowOps Frontend

React web application that provides a **Login** page and a **Welcome (dashboard)** page. Authentication is handled by the project's FastAPI backend service.

---

## Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + inline design tokens |
| Design system | DESIGN.md (FlowOps · Surgical Precision) |
| Font | Inter (Google Fonts) |
| Containerisation | Docker + nginx |

---

## Features

- **Login page** — form that calls `POST /api/auth/login` on the backend, stores the returned `access_token` and `refresh_token` in `sessionStorage`.
- **Welcome page** — protected route that displays a personalised greeting and session info. Redirects unauthenticated users back to `/login`.
- **Protected routes** — any direct navigation to `/welcome` without an active session is immediately redirected to `/login`.
- **Logout** — clears the session tokens and redirects to `/login`.

---

## Prerequisites

- **Node.js** ≥ 20  
- **npm** ≥ 10  
- The backend service running on `http://localhost:8000` (see `../backend/README.md`).

---

## Running in development

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Start the backend (in a separate terminal or with docker-compose)
# See ../backend/README.md

# 3. Start the dev server (proxies /api → http://localhost:8000)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Default credentials

| Username | Password  |
|----------|-----------|
| `admin`  | `admin123` |

---

## Building for production

```bash
npm run build
# Output is in ./dist/
```

---

## Running with Docker Compose (full stack)

From the repository root:

```bash
docker-compose up --build
```

| Service  | URL |
|----------|-----|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend  | [http://localhost:8000](http://localhost:8000) |
| API docs | [http://localhost:8000/docs](http://localhost:8000/docs) |

---

## Project structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Route guard – redirects if unauthenticated
│   ├── contexts/
│   │   └── AuthContext.jsx      # Auth state + login/logout helpers (sessionStorage)
│   ├── pages/
│   │   ├── LoginPage.jsx        # Login form
│   │   └── WelcomePage.jsx      # Protected welcome / dashboard
│   ├── App.jsx                  # Router + AuthProvider setup
│   ├── main.jsx
│   └── index.css                # Tailwind + design tokens
├── Dockerfile
├── nginx.conf                   # nginx SPA config with /api proxy
├── vite.config.js
└── package.json
```

---

## Design system

The UI follows the **FlowOps · Surgical Precision** design specification defined in [`../DESIGN.md`](../DESIGN.md).

Key tokens used:

| Token | Value |
|-------|-------|
| Primary colour | `#111827` |
| Text primary | `#6B7280` |
| Text secondary | `#111827` |
| Surface | `#E5E7EB` |
| Card radius | `32px` |
| Button radius | `9999px` |
| Font | Inter |
