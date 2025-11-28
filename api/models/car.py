from sqlalchemy import Column, Integer, String, JSON
from database.database import Base

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    production_start = Column(String)
    production_end = Column(String)
    models = Column(JSON)
