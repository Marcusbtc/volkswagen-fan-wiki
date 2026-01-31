import csv
import sys
import re
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from database.database import SessionLocal
from models.car import Car

CSV_PATH = "/Users/marcus/Downloads/volkswagen_vehicles_list.csv"


def clean_name(name: str) -> str:
    cleaned = re.sub(r'<[^>]+>', '', name).strip()
    return cleaned if cleaned else None


def load_csv_data():
    data = {}
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = clean_name(row.get('Name of Car', ''))
            if not name:
                continue
            
            full_name = f"Volkswagen {name}"
            
            prod_start = row.get('Production Start', '')
            prod_end = row.get('Production End', '')
            
            try:
                prod_start = str(int(float(prod_start))) if prod_start and prod_start != '?' else None
            except:
                prod_start = None
            
            try:
                prod_end = str(int(float(prod_end))) if prod_end and prod_end != '?' else None
            except:
                prod_end = None
            
            if prod_end == 'Present' or not prod_end:
                prod_end = 'Present'
            
            data[full_name] = {
                'production_start': prod_start,
                'production_end': prod_end,
                'category': row.get('Category', '').strip() or None,
                'engine': row.get('Engine', '').strip() or None,
                'fuel_type': row.get('Fuel Type', '').strip() or None,
                'country': row.get('Country', '').strip() or None,
                'description': row.get('Details Short Description', '').strip() or None,
            }
    return data


def update_cars():
    csv_data = load_csv_data()
    print(f"Loaded {len(csv_data)} cars from CSV")
    
    db = SessionLocal()
    try:
        updated = 0
        cars = db.query(Car).all()
        
        for car in cars:
            if car.name in csv_data:
                info = csv_data[car.name]
                
                if not car.production_start and info['production_start']:
                    car.production_start = info['production_start']
                if not car.production_end or car.production_end == 'Present':
                    if info['production_end']:
                        car.production_end = info['production_end']
                if not car.category and info['category']:
                    car.category = info['category']
                if not car.engine and info['engine']:
                    car.engine = info['engine']
                if not car.fuel_type and info['fuel_type']:
                    car.fuel_type = info['fuel_type']
                if not car.country and info['country']:
                    car.country = info['country']
                if not car.description and info['description']:
                    car.description = info['description']
                
                if not car.tags or len(car.tags) == 0:
                    tags = []
                    if info['category']:
                        tags.append(info['category'])
                    if info['engine']:
                        tags.append(info['engine'])
                    if info['fuel_type']:
                        for fuel in info['fuel_type'].split(','):
                            tags.append(fuel.strip())
                    car.tags = list(set(tags))
                
                updated += 1
        
        db.commit()
        print(f"Updated {updated} cars with details from CSV")
        
        cars_with_desc = db.query(Car).filter(Car.description != None).count()
        print(f"Cars with description: {cars_with_desc}")
    finally:
        db.close()


if __name__ == '__main__':
    update_cars()
