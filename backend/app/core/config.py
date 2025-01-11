from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Document Q&A"
    DEBUG: bool = True
    UPLOAD_DIR: str = "storage/uploads"
    MAX_UPLOAD_SIZE: int = 30 * 1024 * 1024  
    ALLOWED_EXTENSIONS: List[str] = [".xlsx", ".csv"]
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]
    class Config:
        case_sensitive = True
settings = Settings()
