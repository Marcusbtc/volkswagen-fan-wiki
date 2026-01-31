import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from database.database import SessionLocal
from models.car import Car


def clear_wikimedia_urls():
    db = SessionLocal()
    try:
        cars = db.query(Car).filter(Car.image_url.like('%wikimedia.org%')).all()
        count = len(cars)
        
        for car in cars:
            car.image_url = None
        
        db.commit()
        print(f"Cleared {count} Wikimedia URLs")
    finally:
        db.close()


if __name__ == '__main__':
    clear_wikimedia_urls()
