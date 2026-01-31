from pydantic import BaseModel
from typing import Optional, List


class CarCreate(BaseModel):
    name: str
    production_start: Optional[str] = None
    production_end: Optional[str] = None
    models: Optional[list] = []
    image_url: Optional[str] = None
    tags: Optional[List[str]] = None
    description: Optional[str] = None
    engine: Optional[str] = None
    fuel_type: Optional[str] = None
    country: Optional[str] = None
    category: Optional[str] = None
