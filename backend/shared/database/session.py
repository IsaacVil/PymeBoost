"""Session factory and the FastAPI request-scoped DB dependency.

Controllers depend on ``get_db`` so every request gets its own Session that is
always closed, regardless of success or failure.
"""
from collections.abc import Generator

from sqlalchemy.orm import Session, sessionmaker

from backend.shared.database.connection import get_engine

_session_factory: sessionmaker | None = None


def _factory() -> sessionmaker:
    global _session_factory
    if _session_factory is None:
        _session_factory = sessionmaker(
            bind=get_engine(),
            autoflush=False,
            autocommit=False,
            future=True,
        )
    return _session_factory


def get_session() -> Session:
    """Open a new Session bound to the process engine."""
    return _factory()()


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency: yields a Session and guarantees it is closed."""
    db = get_session()
    try:
        yield db
    finally:
        db.close()
