import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from database.database import SessionLocal
from models.car import Car

IMAGES = {
    "Volkswagen ID.3": "https://cdn.motor1.com/images/mgl/MkO9ee/s1/volkswagen-id.3.jpg",
    "Volkswagen Polo": "https://cdn.motor1.com/images/mgl/W8QQKK/s1/volkswagen-polo.jpg",
    "Volkswagen Passat": "https://cdn.motor1.com/images/mgl/6ZOO7e/s1/volkswagen-passat.jpg",
    "Volkswagen ID.4": "https://cdn.motor1.com/images/mgl/P33Wnq/s1/volkswagen-id.4.jpg",
    "Volkswagen Tiguan (Mk2)": "https://cdn.motor1.com/images/mgl/MkO9Ke/s1/volkswagen-tiguan.jpg",
    "Volkswagen Tiguan (Mk3)": "https://cdn.motor1.com/images/mgl/MkO9Ke/s1/volkswagen-tiguan.jpg",
    "Volkswagen Touareg": "https://cdn.motor1.com/images/mgl/W8QQ7K/s1/volkswagen-touareg.jpg",
    "Volkswagen ID. Buzz": "https://cdn.motor1.com/images/mgl/BXx3Gx/s1/volkswagen-id-buzz.jpg",
    "Volkswagen Fusca (Tipo 1)": "https://cdn.motor1.com/images/mgl/nAbbPP/s1/volkswagen-beetle.jpg",
    "Volkswagen Scirocco": "https://cdn.motor1.com/images/mgl/W8QQeK/s1/volkswagen-scirocco.jpg",
    "Volkswagen Gol": "https://cdn.motor1.com/images/mgl/MkO9We/s1/volkswagen-gol.jpg",
    "Volkswagen New Beetle": "https://cdn.motor1.com/images/mgl/nAbbPP/s1/volkswagen-beetle.jpg",
    "Volkswagen Up": "https://cdn.motor1.com/images/mgl/6ZOOPe/s1/volkswagen-up.jpg",
    "Volkswagen T-Roc": "https://cdn.motor1.com/images/mgl/P33W9q/s1/volkswagen-t-roc.jpg",
    "Volkswagen Taos/Tharu": "https://cdn.motor1.com/images/mgl/MkO9Pe/s1/volkswagen-taos.jpg",
    "Volkswagen Vento": "https://cdn.motor1.com/images/mgl/6ZOO7e/s1/volkswagen-passat.jpg",
    "Volkswagen Bora": "https://cdn.motor1.com/images/mgl/6ZOO7e/s1/volkswagen-passat.jpg",
    "Volkswagen Corrado": "https://cdn.motor1.com/images/mgl/W8QQeK/s1/volkswagen-scirocco.jpg",
    "Volkswagen Karmann Ghia": "https://cdn.motor1.com/images/mgl/nAbbPP/s1/volkswagen-beetle.jpg",
    "Volkswagen Golf": "https://cdn.motor1.com/images/mgl/MkO9Ge/s1/volkswagen-golf.jpg",
    "Volkswagen Jetta": "https://cdn.motor1.com/images/mgl/6ZOOPe/s1/volkswagen-jetta.jpg",
    "Volkswagen Arteon": "https://cdn.motor1.com/images/mgl/W8QQ9K/s1/volkswagen-arteon.jpg",
    "Volkswagen Atlas": "https://cdn.motor1.com/images/mgl/P33WPq/s1/volkswagen-atlas.jpg",
    "Volkswagen Teramont": "https://cdn.motor1.com/images/mgl/P33WPq/s1/volkswagen-atlas.jpg",
    "Volkswagen ID.5": "https://cdn.motor1.com/images/mgl/BXx3Px/s1/volkswagen-id.5.jpg",
    "Volkswagen ID.6": "https://cdn.motor1.com/images/mgl/P33Wnq/s1/volkswagen-id.4.jpg",
    "Volkswagen ID.7": "https://cdn.motor1.com/images/mgl/MkO9ee/s1/volkswagen-id.3.jpg",
    "Volkswagen Multivan": "https://cdn.motor1.com/images/mgl/BXx3Gx/s1/volkswagen-id-buzz.jpg",
    "Volkswagen California": "https://cdn.motor1.com/images/mgl/BXx3Gx/s1/volkswagen-id-buzz.jpg",
    "Volkswagen Caravelle": "https://cdn.motor1.com/images/mgl/BXx3Gx/s1/volkswagen-id-buzz.jpg",
    "Volkswagen Touran": "https://cdn.motor1.com/images/mgl/MkO9Ke/s1/volkswagen-tiguan.jpg",
    "Volkswagen Sharan": "https://cdn.motor1.com/images/mgl/MkO9Ke/s1/volkswagen-tiguan.jpg",
    "Volkswagen Saveiro": "https://cdn.motor1.com/images/mgl/MkO9We/s1/volkswagen-gol.jpg",
    "Volkswagen Fox": "https://cdn.motor1.com/images/mgl/MkO9We/s1/volkswagen-gol.jpg",
    "Volkswagen Lupo": "https://cdn.motor1.com/images/mgl/6ZOOPe/s1/volkswagen-up.jpg",
    "Volkswagen Phaeton": "https://cdn.motor1.com/images/mgl/W8QQ9K/s1/volkswagen-arteon.jpg",
    "Volkswagen Eos": "https://cdn.motor1.com/images/mgl/W8QQeK/s1/volkswagen-scirocco.jpg",
    "Volkswagen Golf Plus": "https://cdn.motor1.com/images/mgl/MkO9Ge/s1/volkswagen-golf.jpg",
    "Volkswagen Santana": "https://cdn.motor1.com/images/mgl/6ZOO7e/s1/volkswagen-passat.jpg",
    "Volkswagen Brasília": "https://cdn.motor1.com/images/mgl/MkO9We/s1/volkswagen-gol.jpg",
    "Volkswagen Taigo/Nivus": "https://cdn.motor1.com/images/mgl/P33W9q/s1/volkswagen-t-roc.jpg",
}


def add_images():
    db = SessionLocal()
    try:
        updated = 0
        for name, url in IMAGES.items():
            car = db.query(Car).filter(Car.name == name).first()
            if car:
                car.image_url = url
                updated += 1
                print(f"Updated: {name}")
        
        db.commit()
        print(f"\nTotal updated: {updated} cars with images")
    finally:
        db.close()


if __name__ == '__main__':
    add_images()
