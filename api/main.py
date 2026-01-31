from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import uuid
import shutil

from database.database import engine, get_db, Base
from models.car import Car
from schemas.car import CarCreate
from config import UPLOAD_DIR, ALLOWED_ORIGINS

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Volkswagen Fan Wiki API",
    description="API for Volkswagen Fan Wiki",
    version="0.0.1",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
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
        models=car_data.models or [],
        image_url=car_data.image_url,
        tags=car_data.tags or [],
        description=car_data.description,
        engine=car_data.engine,
        fuel_type=car_data.fuel_type,
        country=car_data.country,
        category=car_data.category
    )
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return {"message": "Car created successfully", "car": new_car}


@app.get("/api/cars/{car_id}")
def get_car(car_id: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car


@app.put("/api/cars/{car_id}")
def update_car(car_id: int, car_data: CarCreate, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    car.name = car_data.name
    car.production_start = car_data.production_start
    car.production_end = car_data.production_end
    car.models = car_data.models or []
    car.image_url = car_data.image_url
    car.tags = car_data.tags or []
    car.description = car_data.description
    car.engine = car_data.engine
    car.fuel_type = car_data.fuel_type
    car.country = car_data.country
    car.category = car_data.category

    db.commit()
    db.refresh(car)
    return {"message": "Car updated successfully", "car": car}


@app.delete("/api/cars/{car_id}")
def delete_car(car_id: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    db.delete(car)
    db.commit()
    return {"message": "Car deleted successfully"}


@app.post("/api/upload")
def upload_image(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1]
    file_name = f"{uuid.uuid4()}.{file_ext}"
    file_path = f"{UPLOAD_DIR}/{file_name}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"url": f"/uploads/{file_name}"}


app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")             
