# Changelog

All notable changes to the Volkswagen Fan Wiki project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- User authentication (JWT)
- Production deployment (Vercel + Railway)
- Redis caching for frequent queries
- Sentry error monitoring

---

## [0.2.0] - 2026-01-31

### Added

#### Frontend (Next.js 16 + React 19)
- **Complete Next.js Application** with App Router architecture
- **Car Listing Page** (`/`) with server-side rendering
- **Car Detail Page** (`/cars/[id]`) with edit functionality
- **SearchableCarList Component** - Main list with search, sorting, and pagination
- **CarCard Component** - Individual car display with favorites and delete actions
- **AddCarForm Component** - Form for creating new cars with image upload
- **ImageUpload Component** - Drag-and-drop image upload with preview
- **Toast Component** - Notification system using Context API
- **Skeleton Component** - Loading placeholders for better UX
- **ErrorBoundary Component** - React error catching with recovery UI
- **Footer Component** - Site footer with VW branding and project links
- **FavoritesContext** - Global state management with localStorage persistence
- **useCars Hook** - Custom hook for CRUD operations
- **carUtils.ts** - Pure functions for sorting, filtering, and pagination
- **Zod Schemas** - Runtime validation for API responses
- **Unit Tests** - Comprehensive tests for `carUtils.ts` using Vitest
- **Liquid Glass UI** - Modern glassmorphism design with Tailwind CSS 4

#### Backend Enhancements
- **Full CRUD Endpoints** - GET, POST, PUT, DELETE for cars
- **Image Upload Endpoint** (`POST /api/upload`) - File upload with UUID naming
- **Static File Serving** - `/uploads/` directory for uploaded images
- **Tags System** - JSON column for car categorization
- **Image URL Field** - Support for car images
- **Database Migrations** - `migrate.py` and `migrate_tags.py` scripts

#### Configuration & Architecture
- **Environment Configuration** - `config.ts` with env variable support
- **API Error Handling** - `ApiError` class with `withRetry()` exponential backoff
- **ARCHITECTURE.md** - Complete system architecture documentation
- **Modular Code Structure** - Separated components, hooks, lib, types, context

### Changed
- **API Functions** - Now use Zod schemas for runtime validation
- **Backend Structure** - Separated `config.py` and `schemas/car.py`
- **Database Schema** - Added `image_url` (VARCHAR) and `tags` (JSON) columns

### Technical Stack
- **Frontend**: Next.js 16.1.6, React 19.2.3, TypeScript 5, Tailwind CSS 4, Zod 4.3.6, Axios 1.13.4, Vitest 4.0.18
- **Backend**: Python 3.9+, FastAPI 0.104.1, SQLAlchemy 2.0.23, Pydantic 2.5.2, PostgreSQL 15

---

## [0.1.0] - 2025-11-28

### Added

#### Backend API with FastAPI
- Created FastAPI application with automatic documentation
- Set up CORS middleware for frontend communication
- Added comprehensive API documentation at `/docs` endpoint

#### Database Infrastructure
- Installed and configured PostgreSQL 15
- Created `volkswagen_wiki` database
- Designed Car model with SQLAlchemy ORM
- Implemented JSON column type for flexible model specifications

#### Initial API Endpoints
- `GET /` - Welcome message and API status
- `GET /api/cars` - Retrieve all cars from database
- `POST /api/cars` - Create new car entry with validation

#### Data Validation
- Implemented Pydantic schemas for request validation
- CarCreate schema for POST endpoint data validation
- Automatic error responses for invalid data

#### Project Structure
- Organized folder structure (api/, web/, my-notes/)
- Created comprehensive .gitignore
- Set up virtual environment for dependency isolation

#### Documentation
- Created README.md with project overview
- Added private study notes in my-notes/ (not tracked by Git)
- Documented all API endpoints and their usage

### Technical Details

**Dependencies:**
- fastapi 0.104.1 - Web framework for building APIs
- uvicorn 0.24.0 - ASGI server for running FastAPI
- sqlalchemy 2.0.23 - SQL toolkit and ORM
- psycopg2-binary 2.9.9 - PostgreSQL adapter for Python
- pydantic 2.5.2 - Data validation using type hints

**Database Schema:**
- Cars table with columns: id, name, production_start, production_end, models (JSON)
- Support for complex nested data structures
- Auto-incrementing primary key

### Repository
- Initialized Git repository
- Pushed to GitHub at `https://github.com/Marcusbtc/volkswagen-fan-wiki`
- Configured .gitignore to exclude venv/, database files, and personal notes

---

## Project Milestones

### Milestone 1: Backend Foundation (Completed 2025-11-28)
- [x] Set up project structure
- [x] Configure PostgreSQL database
- [x] Create FastAPI application
- [x] Implement basic CRUD endpoints (GET, POST)
- [x] Add data validation
- [x] Set up version control

### Milestone 2: Frontend Foundation (Completed 2026-01-31)
- [x] Set up Next.js application with App Router
- [x] Create car listing page with search/filter/pagination
- [x] Implement API integration with retry logic
- [x] Add Tailwind CSS styling (liquid glass design)
- [x] Create car detail page with edit functionality
- [x] Add image upload system
- [x] Implement favorites with localStorage
- [x] Add toast notifications
- [x] Write unit tests

### Milestone 3: Enhanced Features (Completed 2026-01-31)
- [x] Add UPDATE and DELETE endpoints
- [x] Implement search functionality
- [x] Add sorting options (name, year asc/desc)
- [x] Create image upload system
- [x] Add tags system for categorization

### Milestone 4: Production Ready (Planned)
- [ ] User authentication (JWT)
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel
- [ ] Set up custom domain
- [ ] Add monitoring and analytics (Sentry)
- [ ] Redis caching

---

## Notes

- Built to showcase Volkswagen cars, starting with Golf models
- Emphasizes clean code, good documentation, and best practices
- Modern UI with glassmorphism design inspired by VW brand colors (#00B0F0, #001E50)
