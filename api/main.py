from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, get_db
from models.car import Car
from sqlalchemy.orm import Session
from pydantic import BaseModel

app = FastAPI(
    title="Volkswagen Fan Wiki API",
    description="API for Volkswagen Fan Wiki",
    version="0.0.1",
)

from database.database import Base
Base.metadata.create_all(bind=engine)

class CarCreate(BaseModel):
    name: str
    production_start: str
    production_end: str
    models: list

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://volkswagen-fan-wiki.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Volkswagen Fan Wiki API"}

@app.get("/api/cars")
def get_cars(db: Session = Depends(get_db)):
    cars = db.query(Car).all()
    return {"cars": cars}

@app.post("/api/cars")
def create_car(car_data: CarCreate, db: Session = Depends(get_db)):
    new_car = Car(
        name=car_data.name,
        production_start=car_data.production_start,
        production_end=car_data.production_end,
        models=car_data.models
    )
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return {"message": "Car created successfully", "car": new_car}