# Volkswagen Fan Wiki

A comprehensive wiki dedicated to Volkswagen cars. This modern full-stack web application showcases detailed information about VW models including production dates, images, tags, and specifications.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## Features

- **Full CRUD API** - Create, Read, Update, Delete cars
- **Modern Frontend** - Next.js 16 with App Router and React 19
- **Search & Filter** - Real-time search with sorting options
- **Pagination** - Smart pagination with ellipsis
- **Image Upload** - Drag-and-drop with preview
- **Tags System** - Categorize cars with tags
- **Favorites** - Persist favorites in localStorage
- **Toast Notifications** - User feedback system
- **Error Handling** - Retry logic + Error Boundaries
- **Liquid Glass UI** - Modern glassmorphism design
- **Type Safety** - TypeScript + Zod validation
- **Unit Tests** - Vitest for utility functions
- **API Docs** - Automatic Swagger UI at `/docs`
- **CSV Import** - Bulk import cars from CSV files

## Screenshots

### Main Page
![Main Page - Volkswagen Collection](info/images/Screenshot%202026-01-31%20at%2017.52.45.png)

### Car Detail View
![Car Detail with Specifications](info/images/Screenshot%202026-01-31%20at%2017.55.34.png)

### Add New Car
![Add Car Form](info/images/Screenshot%202026-01-31%20at%2017.55.53.png)

## Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.9+ | Programming language |
| FastAPI | 0.104.1 | Async web framework |
| SQLAlchemy | 2.0.23 | ORM |
| Pydantic | 2.5.2 | Data validation |
| PostgreSQL | 15 | Database |
| Uvicorn | 0.24.0 | ASGI server |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework (App Router) |
| React | 19.2.3 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Zod | 4.3.6 | Runtime validation |
| Axios | 1.13.4 | HTTP client |
| Vitest | 4.0.18 | Testing |

## Project Structure

```
volkswagen-fan-wiki/
├── api/                          # Backend (Python/FastAPI)
│   ├── main.py                   # FastAPI app + endpoints
│   ├── config.py                 # Configuration
│   ├── database/
│   │   └── database.py           # SQLAlchemy setup
│   ├── models/
│   │   └── car.py                # Car ORM model
│   ├── schemas/
│   │   └── car.py                # Pydantic schemas
│   ├── migrate.py                # DB migration (image_url)
│   ├── migrate_tags.py           # DB migration (tags)
│   ├── uploads/                  # Uploaded images
│   └── requirements.txt
│
├── web/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                  # App Router pages
│   │   │   ├── layout.tsx        # Root layout
│   │   │   ├── page.tsx          # Home (car list)
│   │   │   └── cars/[id]/page.tsx # Car detail
│   │   ├── components/           # React components
│   │   │   ├── SearchableCarList.tsx
│   │   │   ├── CarCard.tsx
│   │   │   ├── AddCarForm.tsx
│   │   │   ├── ImageUpload.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Footer.tsx
│   │   ├── context/
│   │   │   └── FavoritesContext.tsx
│   │   ├── hooks/
│   │   │   └── useCars.ts
│   │   ├── lib/
│   │   │   ├── api.ts            # API client + retry
│   │   │   ├── config.ts         # Environment config
│   │   │   ├── carUtils.ts       # Sort/filter/paginate
│   │   │   └── carUtils.test.ts  # Unit tests
│   │   └── types/
│   │       ├── car.ts            # TypeScript interfaces
│   │       └── schemas.ts        # Zod schemas
│   └── package.json
│
├── ARCHITECTURE.md               # System architecture docs
├── CHANGELOG.md                  # Version history
└── README.md                     # This file
```

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 15
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Marcusbtc/volkswagen-fan-wiki.git
cd volkswagen-fan-wiki
```

### 2. Backend Setup
```bash
# Create database
createdb volkswagen_wiki

# Setup Python environment
cd api
python3 -m venv venv
source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run migrations (if needed)
python migrate.py
python migrate_tags.py

# Start server
uvicorn main:app --reload
```

**Backend runs at:** http://127.0.0.1:8000

### 3. Frontend Setup
```bash
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs at:** http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/api/cars` | List all cars |
| POST | `/api/cars` | Create car |
| GET | `/api/cars/{id}` | Get car by ID |
| PUT | `/api/cars/{id}` | Update car |
| DELETE | `/api/cars/{id}` | Delete car |
| POST | `/api/upload` | Upload image |
| GET | `/uploads/{file}` | Serve image |

### Example: Create Car
```bash
curl -X POST http://127.0.0.1:8000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Volkswagen Golf GTI",
    "production_start": "1976",
    "production_end": "2024",
    "models": ["Mk1", "Mk2", "Mk8"],
    "image_url": "/uploads/golf-gti.jpg",
    "tags": ["hot-hatch", "iconic", "performance"]
  }'
```

## Database Schema

### Cars Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto) |
| name | VARCHAR | Car model name (indexed) |
| production_start | VARCHAR | Start year |
| production_end | VARCHAR | End year |
| models | JSON | Model variants array |
| image_url | VARCHAR | Image path (nullable) |
| tags | JSON | Tags array (default: []) |

## Testing

```bash
cd web
npm test
```

Tests cover:
- `sortCars()` - Sorting by name, year asc/desc
- `filterCarsByQuery()` - Search filtering
- `getPageNumbers()` - Pagination logic
- `paginate()` - Array slicing

## Design System

The UI uses a **liquid glass** (glassmorphism) design with VW brand colors:
- **Primary Blue**: `#00B0F0`
- **Dark Blue**: `#001E50`
- **Glass Effect**: `backdrop-blur-xl` + `bg-white/10`

## Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture, data flow, design patterns
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and milestones
- **API Docs**: http://127.0.0.1:8000/docs (Swagger UI)
- **API Docs**: http://127.0.0.1:8000/redoc (ReDoc)

## Project Status

**Current Version:** 0.2.0  
**Status:** MVP Complete

### Completed
- [x] Backend API (full CRUD)
- [x] PostgreSQL database
- [x] Next.js frontend
- [x] Search, sort, pagination
- [x] Image upload
- [x] Tags system
- [x] Favorites
- [x] Unit tests
- [x] Documentation

### Planned
- [ ] User authentication (JWT)
- [ ] Production deployment
- [ ] Redis caching
- [ ] Error monitoring (Sentry)

## Author

**Marcus Barbosa**
- GitHub: [@Marcusbtc](https://github.com/Marcusbtc)
- Website: [marcusbtc.com.br](https://marcusbtc.com.br)

## License

This project is open source and available under the MIT License.

---

**Built with passion for Volkswagen cars**
