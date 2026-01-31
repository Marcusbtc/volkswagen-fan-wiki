from fastapi import FastAPI, HTTPException, Depends
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

from typing import Optional

class CarCreate(BaseModel):
    name: str
    production_start: str
    production_end: str
    models: list
    image_url: Optional[str] = None

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
        models=car_data.models,
        image_url=car_data.image_url
    )
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return {"message": "Car created successfully", "car": new_car}

@app.get("/api/cars/{car_id}")
def get_car(car_id: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code= 404, detail="This car not found in the database")
    return car

@app.put("/api/cars/{car_id}")
def update_car(car_id: int, car_data: CarCreate, db: Session = Depends(get_db)):        
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found in the database")
    
    car.name = car_data.name
    car.production_start = car_data.production_start
    car.production_end = car_data.production_end
    car.models = car_data.models
    car.image_url = car_data.image_url

    db.commit()
    db.refresh(car)
    return {"message": "Car updated successfully", "Car": car}

@app.delete("/api/cars/{car_id}")
def delete_car(car_id: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car: 
        raise HTTPException(status_code=404, detail="This car was not found in the database")
    db.delete(car)
    db.commit()
    return {"message": "Car deleted successfully"}             
