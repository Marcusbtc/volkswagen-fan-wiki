import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import create_engine, text
from database.database import DATABASE_URL

engine = create_engine(DATABASE_URL)

NEW_COLUMNS = [
    ("description", "VARCHAR"),
    ("engine", "VARCHAR"),
    ("fuel_type", "VARCHAR"),
    ("country", "VARCHAR"),
    ("category", "VARCHAR"),
]

with engine.connect() as conn:
    for col_name, col_type in NEW_COLUMNS:
        result = conn.execute(text(f"""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'cars' AND column_name = '{col_name}'
        """))
        
        if not result.fetchone():
            conn.execute(text(f"ALTER TABLE cars ADD COLUMN {col_name} {col_type}"))
            print(f"Added column: {col_name}")
        else:
            print(f"Column {col_name} already exists")
    
    conn.commit()
    print("Migration complete")
