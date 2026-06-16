"""Environment-driven application configuration.

Validated at startup by pydantic-settings. The defaults target the LOCAL MVP
profile (see docs/mvpspec.md §2): same variable names as the cloud design, mapped
to local equivalents. Cloud-only variables stay declared but optional so the code
matches the README architecture without requiring GCP/Auth0 to run locally.
"""
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(Path(__file__).parent / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- Core ---------------------------------------------------------------
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    API_VERSION: str = "v1"
    USE_MOCKS: bool = True  # local profile: mock AI / auth / storage adapters

    # --- Database (local default → docker-compose Postgres) -----------------
    DATABASE_URL: str = "postgresql://pymeboost:pymeboost@localhost:5432/pymeboost"
    DATABASE_POOL_SIZE: int = 5

    # --- Auth: mock JWT local (perfil local; reemplaza Auth0) ---------------
    JWT_SECRET: str = "dev-only-change-me"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 180

    # --- CORS (comma-separated origins) -------------------------------------
    CORS_ORIGINS: str = "http://localhost:3000"

    # --- Cloud variables (opcionales en local; ver docs/mvpspec.md §2.1) ----
    AUTH0_DOMAIN: str = ""
    JWKS_URL: str = ""
    GCP_PROJECT_ID: str = ""
    GCS_BUCKET_NAME: str = ""
    PUBSUB_TOPIC_CONTRACTS: str = ""
    REDIS_URL: str = ""
    KMS_KEY_NAME: str = ""
    LANGRAPH_API_KEY: str = ""

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]


settings = Settings()
