from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    API_VERSION: str = "v1"
    AUTH0_DOMAIN: str = ""
    JWKS_URL: str = ""
    GCP_PROJECT_ID: str = ""
    DATABASE_URL: str = ""
    DATABASE_POOL_SIZE: int = 5
    GCS_BUCKET_NAME: str = ""
    PUBSUB_TOPIC_CONTRACTS: str = ""
    REDIS_URL: str = ""
    KMS_KEY_NAME: str = ""
    LANGRAPH_API_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
