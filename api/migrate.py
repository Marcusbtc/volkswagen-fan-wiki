from sqlalchemy import create_engine, text
from database.database import DATABASE_URL

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text("""
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'cars' AND column_name = 'image_url'
    """))
    
    if not result.fetchone():
        conn.execute(text("ALTER TABLE cars ADD COLUMN image_url VARCHAR"))
        conn.commit()
        print("Column added successfully!")
    else:
        print("image_url column already exists")
