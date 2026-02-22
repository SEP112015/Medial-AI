from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Medical AI Platform"
    ENV: str = "dev"

settings = Settings()
