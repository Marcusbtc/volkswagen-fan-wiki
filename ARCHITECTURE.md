# System Architecture - Volkswagen Fan Wiki

## Overview

Volkswagen Fan Wiki is a modern full-stack application following a **client-server** architecture with clear separation between frontend and backend.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                     Next.js 16 (React 19)                           │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │    │
│  │  │   App Router │  │  Components  │  │     Context/Hooks        │  │    │
│  │  │  /           │  │  CarCard     │  │  FavoritesContext        │  │    │
│  │  │  /cars/[id]  │  │  AddCarForm  │  │  useCars                 │  │    │
│  │  │              │  │  Toast       │  │  useToast                │  │    │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘  │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │                    Lib (Utilities)                           │  │    │
│  │  │  api.ts (Axios + Retry) │ config.ts │ carUtils.ts            │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │                    Types (TypeScript + Zod)                  │  │    │
│  │  │  car.ts (interfaces) │ schemas.ts (runtime validation)       │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP/REST (JSON)
                                      │ Port 3000 → 8000
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SERVER (Backend API)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      FastAPI (Python 3.9+)                          │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │    │
│  │  │   main.py    │  │   config.py  │  │      CORS Middleware     │  │    │
│  │  │  Endpoints   │  │  Settings    │  │  localhost:3000 allowed  │  │    │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘  │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │                    Models (SQLAlchemy)                       │  │    │
│  │  │  Car: id, name, production_start/end, models, image_url, tags│  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │                    Schemas (Pydantic)                        │  │    │
│  │  │  CarCreate: input validation for POST/PUT               │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ SQLAlchemy ORM
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATABASE                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      PostgreSQL 15                                  │    │
│  │  ┌──────────────────────────────────────────────────────────────┐  │    │
│  │  │  Database: volkswagen_wiki                                   │  │    │
│  │  │  Table: cars                                                 │  │    │
│  │  │  ├── id (INTEGER, PK, AUTO)                                  │  │    │
│  │  │  ├── name (VARCHAR, INDEX)                                   │  │    │
│  │  │  ├── production_start (VARCHAR)                              │  │    │
│  │  │  ├── production_end (VARCHAR)                                │  │    │
│  │  │  ├── models (JSON)                                           │  │    │
│  │  │  ├── image_url (VARCHAR, NULLABLE)                           │  │    │
│  │  │  └── tags (JSON, DEFAULT [])                                 │  │    │
│  │  └──────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
volkswagen-fan-wiki/
├── api/                          # Python/FastAPI Backend
│   ├── main.py                   # FastAPI app and endpoints
│   ├── config.py                 # Settings (UPLOAD_DIR, CORS)
│   ├── database/
│   │   └── database.py           # SQLAlchemy connection + SessionLocal
│   ├── models/
│   │   ├── __init__.py
│   │   └── car.py                # SQLAlchemy Car model
│   ├── schemas/
│   │   └── car.py                # Pydantic CarCreate schema
│   ├── migrate.py                # Migration: adds image_url
│   ├── migrate_tags.py           # Migration: adds tags
│   ├── uploads/                  # Uploaded images directory
│   └── requirements.txt          # Python dependencies
│
├── web/                          # Next.js Frontend
│   ├── src/
│   │   ├── app/                  # App Router (Next.js 13+)
│   │   │   ├── layout.tsx        # Root layout with providers
│   │   │   ├── page.tsx          # Home page (car list)
│   │   │   ├── globals.css       # Global styles + glass UI
│   │   │   └── cars/
│   │   │       └── [id]/
│   │   │           └── page.tsx  # Car detail page
│   │   │
│   │   ├── components/           # React components
│   │   │   ├── AddCarForm.tsx    # Creation form
│   │   │   ├── CarCard.tsx       # Car display card
│   │   │   ├── SearchableCarList.tsx  # List with search/filter/pagination
│   │   │   ├── ImageUpload.tsx   # Image upload with drag-drop
│   │   │   ├── Toast.tsx         # Notification system
│   │   │   ├── Skeleton.tsx      # Loading placeholders
│   │   │   ├── ErrorBoundary.tsx # React error handling
│   │   │   └── Footer.tsx        # Site footer
│   │   │
│   │   ├── context/
│   │   │   └── FavoritesContext.tsx  # Global favorites state
│   │   │
│   │   ├── hooks/
│   │   │   └── useCars.ts        # Hook for CRUD operations
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts            # HTTP client with retry
│   │   │   ├── config.ts         # Frontend settings
│   │   │   ├── carUtils.ts       # Sort/filter/paginate functions
│   │   │   └── carUtils.test.ts  # Unit tests
│   │   │
│   │   └── types/
│   │       ├── car.ts            # TypeScript Car interface
│   │       └── schemas.ts        # Zod schemas for validation
│   │
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vitest.config.ts
│
├── ARCHITECTURE.md               # This document
├── CHANGELOG.md                  # Version history
├── README.md                     # Main documentation
└── .gitignore
```

---

## Data Flow

### 1. Car Listing (GET)

```
Browser → Next.js SSR → api.getCars() → FastAPI /api/cars → PostgreSQL
                                                    ↓
Browser ← React Render ← Zod Validation ← JSON Response ←────────┘
```

### 2. Car Creation (POST)

```
AddCarForm → createCar() → POST /api/cars → Pydantic Validation
                                                    ↓
Toast ← refreshCars() ← JSON Response ← SQLAlchemy Insert ←────┘
```

### 3. Image Upload

```
ImageUpload → FormData → POST /api/upload → Save to /uploads/
                                                    ↓
Preview ← URL Response ← Static File Served ←───────┘
```

---

## Main Components

### Backend (FastAPI)

| File | Responsibility |
|---------|------------------|
| `main.py` | REST endpoints, CORS, static files |
| `database.py` | SQLAlchemy engine, session factory |
| `models/car.py` | ORM model with JSON fields |
| `schemas/car.py` | Pydantic validation for requests |
| `config.py` | Configuration constants |

### Frontend (Next.js)

| Component | Responsibility |
|------------|------------------|
| `SearchableCarList` | Main list with search, sorting, pagination |
| `CarCard` | Individual display with favorites and delete |
| `AddCarForm` | Creation form with upload |
| `Toast` | Notification system (Context API) |
| `FavoritesContext` | State persisted in localStorage |
| `useCars` | Hook for fetch and mutations |
| `api.ts` | Axios client with exponential retry |

---

## Design Patterns

### 1. **Separation of Concerns**
- Models separated from Schemas
- Components separated from Hooks
- API client isolated in `lib/api.ts`

### 2. **Single Responsibility**
- Each component has a single function
- Hooks encapsulate state logic
- Utils contain pure functions

### 3. **Error Handling**
- `ApiError` class with status codes
- `withRetry()` for transient failures
- `ErrorBoundary` for React crashes
- Toast notifications for feedback

### 4. **Type Safety**
- TypeScript strict mode
- Zod schemas for runtime validation
- Pydantic for backend validation

### 5. **State Management**
- React Context for global state (Favorites)
- useState for local state
- Server-side rendering for initial data

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-----------|
| GET | `/` | Welcome message |
| GET | `/api/cars` | List all cars |
| POST | `/api/cars` | Create new car |
| GET | `/api/cars/{id}` | Get car by ID |
| PUT | `/api/cars/{id}` | Update car |
| DELETE | `/api/cars/{id}` | Delete car |
| POST | `/api/upload` | Image upload |
| GET | `/uploads/{filename}` | Serve static file |

---

## Technologies

### Backend
- **Python 3.9+**
- **FastAPI 0.104.1** - Async web framework
- **SQLAlchemy 2.0.23** - ORM
- **Pydantic 2.5.2** - Data validation
- **PostgreSQL 15** - Database
- **Uvicorn 0.24.0** - ASGI server

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Static typing
- **Tailwind CSS 4** - Utility-first styling
- **Zod 4.3.6** - Schema validation
- **Axios 1.13.4** - HTTP client
- **Vitest 4.0.18** - Testing framework

---

## Environment Configuration

### Backend (`api/config.py`)
```python
UPLOAD_DIR = "uploads"
ALLOWED_ORIGINS = ["http://localhost:3000", "https://volkswagen-fan-wiki.com"]
```

### Frontend (`web/src/lib/config.ts`)
```typescript
CONFIG = {
  API_URL: env('NEXT_PUBLIC_API_URL', 'http://127.0.0.1:8000'),
  ITEMS_PER_PAGE: 50,
  FAVORITES_KEY: 'vw-favorites',
  TOAST_DURATION: 3000
}
```

---

## Security

- **CORS** configured for specific origins
- **Validation** on both layers (Pydantic + Zod)
- **Sanitization** of uploads (type checking)
- **UUIDs** for uploaded file names

---

## Future Scalability

1. **Authentication** - JWT tokens with FastAPI Security
2. **Cache** - Redis for frequent queries
3. **CDN** - Cloudflare for static assets
4. **Deploy** - Vercel (frontend) + Railway (backend)
5. **Monitoring** - Sentry for error tracking
