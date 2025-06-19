from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "EasyToolTown API"
    debug: bool = False
    version: str = "1.0.0"

    class Config:
        env_file = ".env"

settings = Settings() 