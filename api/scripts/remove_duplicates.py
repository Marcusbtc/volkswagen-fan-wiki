import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import func
from database.database import SessionLocal
from models.car import Car


def remove_duplicates():
    db = SessionLocal()
    try:
        duplicates = db.query(Car.name).group_by(Car.name).having(func.count(Car.id) > 1).all()
        
        removed = 0
        for (name,) in duplicates:
            cars = db.query(Car).filter(Car.name == name).order_by(Car.id).all()
            best = cars[0]
            for car in cars:
                if car.image_url:
                    best = car
                    break
                if car.tags and len(car.tags) > len(best.tags or []):
                    best = car
                if car.production_start and not best.production_start:
                    best = car
            
            for car in cars:
                if car.id != best.id:
                    db.delete(car)
                    removed += 1
        
        db.commit()
        print(f"Removed {removed} duplicate cars")
        print(f"Remaining cars: {db.query(Car).count()}")
    finally:
        db.close()


if __name__ == '__main__':
    remove_duplicates()
