from socket import NI_NAMEREQD
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import csv
from database.database import SessionLocal, engine, Base
from models.car import Car
from sqlalchemy import text

Base.metadata.create_all(bind=engine)
def import_cars():
    db = SessionLocal()
    csv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'info', 'volkswagen_modelos.csv')

    imported = 0
    skipped = 0
    seen = set()

    print("Starting import")

    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        for row in reader:
            name = row.get('modelLabel')

            if not name or name.startswith('Q'):
                skipped +=1
                continue

            seen.add(name)

            start_year = row.get('ano_inicio', '').strip() or None
            end_year = row.get('ano_fim', '').strip() or None

            car = Car(
                name=name,
                production_start=start_year,
                production_end=end_year,
                models=[]
            )

            db.add(car)
            imported +=1

            if imported % 10 == 0:
                print(f"Imported {imported} cars and skipped {skipped} rows")

    db.commit()
    db.close()
    print("Import completed")
    print(f"Imported {imported} cars and skipped {skipped} rows")

if __name__ == "__main__":
    import_cars()