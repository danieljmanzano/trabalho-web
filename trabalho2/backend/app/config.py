from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Banco de dados
    DATABASE_URL: str = "postgresql://neondb_owner:npg_WHKiCU8Nby1L@ep-rough-cake-adt4tk8r-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

    # JWT
    SECRET_KEY: str = "trocar-esta-chave-em-producao"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 dia

    class Config:
        env_file = ".env"


settings = Settings()
