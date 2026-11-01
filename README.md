# personal portfolio

A responsive React and TypeScript personal portfolio, based on the supplied design references. It includes independently rotatable value cards and a FastAPI backend health check.

## Run locally

### Frontend

```powershell
npm.cmd install
npm.cmd run dev
```

### API

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --port 8000
```

Vite proxies `/api` requests to `http://127.0.0.1:8000`. The API is available at `/api/health`; interactive API documentation is at `/docs`.

The contact card links to my email, LinkedIn, and GitHub profiles.
