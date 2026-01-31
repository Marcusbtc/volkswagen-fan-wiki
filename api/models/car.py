from sqlalchemy import Column, Integer, String, JSON
from database.database import Base

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    production_start = Column(String)
    production_end = Column(String)
    models = Column(JSON)
    image_url = Column(String, nullable=True)
    tags = Column(JSON, default=list)
    description = Column(String, nullable=True)
    engine = Column(String, nullable=True)
    fuel_type = Column(String, nullable=True)
    country = Column(String, nullable=True)
    category = Column(String, nullable=True)
