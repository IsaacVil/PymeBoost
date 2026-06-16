"""Database engine factory.

Single lazily-created Engine for the whole process. ``pool_pre_ping`` recycles
dead connections (relevant when the local Postgres container restarts).
"""
from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine

from backend.config import settings


@lru_cache(maxsize=1)
def get_engine() -> Engine:
    """Return the process-wide SQLAlchemy engine (created on first call)."""
    return create_engine(
        settings.DATABASE_URL,
        pool_size=settings.DATABASE_POOL_SIZE,
        pool_pre_ping=True,
        future=True,
        connect_args={"client_encoding": "utf8"},
    )
