# Volkswagen Fan Wiki 🚗

A comprehensive wiki dedicated to Volkswagen cars, starting with the iconic Golf series. This full-stack web application showcases detailed information about VW models including production dates, technical specifications, engine details, and unique characteristics.

## 🎯 Project Overview

A modern full-stack web application featuring:

- **Backend API**: Python + FastAPI - RESTful API for car data management
- **Frontend**: Next.js - Server-side rendered dynamic wiki pages
- **Database**: PostgreSQL 15 - Relational database with JSON support
- **Documentation**: Automatic API docs via Swagger UI

## ✨ Features

### Current (v0.1.0)
- ✅ RESTful API with GET and POST endpoints
- ✅ PostgreSQL database with Car model
- ✅ Automatic API documentation at `/docs`
- ✅ CORS enabled for frontend communication
- ✅ Data validation with Pydantic schemas
- ✅ JSON support for complex car specifications

### Planned
- 🔄 Next.js frontend with Tailwind CSS
- 🔄 Car listing and detail pages
- 🔄 Search and filter functionality
- 🔄 Update and delete operations
- 🔄 Image gallery for each model
- 🔄 Custom VW-themed styling and animations

## 📁 Project Structure

```
volkswagen-fan-wiki/
├── api/                    # Backend (Python + FastAPI)
│   ├── database/          # Database configuration
│   │   └── database.py    # SQLAlchemy setup
│   ├── models/            # Database models
│   │   ├── car.py        # Car model definition
│   │   └── __init__.py
│   ├── main.py           # FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── venv/            # Virtual environment (not in Git)
├── web/                  # Frontend (Next.js - coming soon)
├── CHANGELOG.md         # Version history
├── README.md            # This file
└── .gitignore          # Git ignore rules
```

## 🛠 Tech Stack

### Backend
- **Python 3.9+** - Programming language
- **FastAPI** - Modern, fast web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL 15** - Relational database
- **Pydantic** - Data validation
- **psycopg2-binary** - PostgreSQL adapter

### Frontend (Coming Soon)
- **Next.js** - React framework
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type-safe JavaScript

## 🚀 Getting Started

### Prerequisites
- Python 3.9 or higher
- PostgreSQL 15
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Marcusbtc/volkswagen-fan-wiki.git
   cd volkswagen-fan-wiki
   ```

2. **Set up PostgreSQL**
   ```bash
   # Install PostgreSQL (macOS)
   brew install postgresql@15

   # Start PostgreSQL
   brew services start postgresql@15

   # Create database
   createdb volkswagen_wiki
   ```

3. **Set up Python virtual environment**
   ```bash
   cd api
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the development server**
   ```bash
   uvicorn main:app --reload
   ```

6. **Access the API**
   - API: http://127.0.0.1:8000
   - Interactive docs: http://127.0.0.1:8000/docs
   - Alternative docs: http://127.0.0.1:8000/redoc

### Frontend Setup (Coming Soon)
Instructions will be added when Next.js frontend is implemented.

## 📡 API Endpoints

### Current Endpoints

| Method | Endpoint      | Description                |
|--------|---------------|----------------------------|
| GET    | `/`           | Welcome message            |
| GET    | `/api/cars`   | Get all cars               |
| POST   | `/api/cars`   | Create a new car           |

### Example Usage

**Get all cars:**
```bash
curl http://127.0.0.1:8000/api/cars
```

**Create a new car:**
```bash
curl -X POST http://127.0.0.1:8000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Volkswagen Golf",
    "production_start": "1974",
    "production_end": "2024",
    "models": [
      {
        "version": "GTI",
        "engine": "1.6L",
        "power": "200hp",
        "torque": "250Nm",
        "top_speed": "250km/h",
        "acceleration": "5.5s",
        "colors": ["blue", "red", "black", "white"]
      }
    ]
  }'
```

## 🗄 Database Schema

### Cars Table

| Column             | Type    | Description                      |
|--------------------|---------|----------------------------------|
| id                 | INTEGER | Primary key (auto-increment)     |
| name               | VARCHAR | Car model name                   |
| production_start   | VARCHAR | Production start year            |
| production_end     | VARCHAR | Production end year              |
| models             | JSON    | Array of model variants & specs  |

## 🚗 Models Covered

- **Volkswagen Golf** (all generations: Mk1 - Mk8)
  - GTI variants
  - R variants
  - Standard models

_More models will be added soon!_

## 📚 Documentation

- API Documentation: Available at `/docs` when server is running
- [CHANGELOG.md](CHANGELOG.md) - Version history and updates
- Study notes: Private documentation for learning purposes (not in Git)

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

## 📝 License

This project is open source and available for educational purposes.

## 👤 Author

**Marcus Barbosa**
- GitHub: [@Marcusbtc](https://github.com/Marcusbtc)
- Learning: Full-stack development with Python and Next.js

## 📊 Project Status

**Current Version:** 0.1.0
**Status:** 🚧 Active Development

### Milestones
- [x] Backend API setup
- [x] Database configuration
- [x] Basic CRUD endpoints
- [ ] Frontend setup
- [ ] Full CRUD operations
- [ ] Search & filter
- [ ] Production deployment

## 🙏 Acknowledgments

- FastAPI for the amazing framework and documentation
- PostgreSQL for the robust database system
- The Volkswagen community for inspiration

---

**Built with ❤️ and a passion for Volkswagen cars**
