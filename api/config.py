import os

UPLOAD_DIR = "uploads"
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://volkswagen-fan-wiki.com"
]

os.makedirs(UPLOAD_DIR, exist_ok=True)
