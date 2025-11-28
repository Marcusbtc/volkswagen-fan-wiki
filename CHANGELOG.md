# Changelog

All notable changes to the Volkswagen Fan Wiki project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Next.js frontend setup
- Car listing page
- Car detail page
- Search and filter functionality
- Image gallery for cars
- User authentication

---

## [0.1.0] - 2025-11-28

### Added
- **Backend API with FastAPI**
  - Created FastAPI application with automatic documentation
  - Set up CORS middleware for frontend communication
  - Added comprehensive API documentation at `/docs` endpoint

- **Database Infrastructure**
  - Installed and configured PostgreSQL 15
  - Created `volkswagen_wiki` database
  - Designed Car model with SQLAlchemy ORM
  - Implemented JSON column type for flexible model specifications

- **API Endpoints**
  - `GET /` - Welcome message and API status
  - `GET /api/cars` - Retrieve all cars from database
  - `POST /api/cars` - Create new car entry with validation

- **Data Validation**
  - Implemented Pydantic schemas for request validation
  - CarCreate schema for POST endpoint data validation
  - Automatic error responses for invalid data

- **Project Structure**
  - Organized folder structure (api/, web/, my-notes/)
  - Created comprehensive .gitignore
  - Set up virtual environment for dependency isolation

- **Documentation**
  - Created README.md with project overview
  - Added private study notes in my-notes/ (not tracked by Git)
  - Documented all API endpoints and their usage

### Technical Details

**Dependencies Installed:**
- fastapi - Web framework for building APIs
- uvicorn - ASGI server for running FastAPI
- sqlalchemy - SQL toolkit and ORM
- psycopg2-binary - PostgreSQL adapter for Python
- pydantic - Data validation using type hints

**Database Schema:**
- Cars table with columns: id, name, production_start, production_end, models (JSON)
- Support for complex nested data structures
- Auto-incrementing primary key

**Features:**
- Automatic API documentation (Swagger UI)
- CORS enabled for localhost:3000 (Next.js frontend)
- Database connection pooling
- Proper error handling and validation

### Repository
- Initialized Git repository
- Pushed to GitHub at `https://github.com/Marcusbtc/volkswagen-fan-wiki`
- Configured .gitignore to exclude venv/, database files, and personal notes

---

## Project Milestones

### Milestone 1: Backend Foundation ✅ (Completed 2025-11-28)
- [x] Set up project structure
- [x] Configure PostgreSQL database
- [x] Create FastAPI application
- [x] Implement basic CRUD endpoints (GET, POST)
- [x] Add data validation
- [x] Set up version control

### Milestone 2: Frontend Foundation (In Progress)
- [ ] Set up Next.js application
- [ ] Create car listing page
- [ ] Implement API integration
- [ ] Add Tailwind CSS styling
- [ ] Create car detail page

### Milestone 3: Enhanced Features (Planned)
- [ ] Add UPDATE and DELETE endpoints
- [ ] Implement search functionality
- [ ] Add filtering options
- [ ] Create image upload system
- [ ] Add more Volkswagen models

### Milestone 4: Production Ready (Future)
- [ ] User authentication
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel
- [ ] Set up custom domain
- [ ] Add monitoring and analytics

---

## Notes

- This is a learning project focused on full-stack development
- Built to showcase Volkswagen cars, starting with Golf models
- Emphasizes clean code, good documentation, and best practices
