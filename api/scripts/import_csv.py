import csv
import sys
import re
from pathlib import Path
from typing import Optional, List, Dict, Set

sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from database.database import SessionLocal
from models.car import Car


def clean_name(name: str) -> Optional[str]:
    cleaned = re.sub(r'<[^>]+>', '', name).strip()
    return cleaned if cleaned else None


def parse_year(value: str) -> Optional[str]:
    if not value or value == '?' or value == 'Present':
        return value if value == 'Present' else None
    try:
        return str(int(float(value)))
    except (ValueError, TypeError):
        return None


def parse_tags(row: Dict) -> List[str]:
    tags = []
    if row.get('Category'):
        tags.append(row['Category'].strip())
    if row.get('Engine'):
        tags.append(row['Engine'].strip())
    if row.get('Fuel Type'):
        tags.extend([f.strip() for f in row['Fuel Type'].split(',')])
    return list(set(tags))


def is_valid_car(name: str) -> bool:
    if not name:
        return False
    invalid_names = {'Unknown', 'Hatchback', 'minivan', 'liftback', 
                     'Station wagon', 'Van', 'Picape', '2022'}
    return name not in invalid_names


def load_csv(filepath: str) -> List[Dict]:
    cars = []
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = clean_name(row.get('Name of Car', ''))
            if not is_valid_car(name):
                continue
            car = {
                'name': f"Volkswagen {name}",
                'production_start': parse_year(row.get('Production Start')),
                'production_end': parse_year(row.get('Production End')) or 'Present',
                'tags': parse_tags(row),
                'image_url': None,
            }
            cars.append(car)
    return cars


def deduplicate_cars(cars: List[Dict]) -> List[Dict]:
    seen = set()
    unique = []
    for car in cars:
        if car['name'] not in seen:
            seen.add(car['name'])
            unique.append(car)
    return unique


def get_existing_names(db: Session) -> Set[str]:
    existing = db.query(Car.name).all()
    return {name for (name,) in existing}


def import_cars(cars: List[Dict], db: Session, update_images: bool = False) -> Dict:
    existing_names = get_existing_names(db)
    stats = {'added': 0, 'skipped': 0, 'updated': 0}
    
    for car_data in cars:
        name = car_data['name']
        
        if name in existing_names:
            if update_images and car_data.get('image_url'):
                existing_car = db.query(Car).filter(Car.name == name).first()
                if existing_car and not existing_car.image_url:
                    existing_car.image_url = car_data['image_url']
                    stats['updated'] += 1
            else:
                stats['skipped'] += 1
            continue
        
        new_car = Car(
            name=name,
            production_start=car_data['production_start'],
            production_end=car_data['production_end'],
            models=[],
            image_url=car_data.get('image_url'),
            tags=car_data['tags']
        )
        db.add(new_car)
        stats['added'] += 1
        existing_names.add(name)
    
    db.commit()
    return stats


def main(csv_path: str, update_images: bool = False) -> None:
    print(f"Loading CSV from: {csv_path}")
    
    cars = load_csv(csv_path)
    print(f"Parsed {len(cars)} valid cars from CSV")
    
    cars = deduplicate_cars(cars)
    print(f"After deduplication: {len(cars)} unique cars")
    
    db = SessionLocal()
    try:
        stats = import_cars(cars, db, update_images=update_images)
        print(f"\nImport complete:")
        print(f"  Added: {stats['added']}")
        print(f"  Skipped (existing): {stats['skipped']}")
        print(f"  Updated (images): {stats['updated']}")
    finally:
        db.close()


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('csv_path')
    parser.add_argument('--update-images', action='store_true')
    args = parser.parse_args()
    main(args.csv_path, args.update_images)
