"""Infrastructure health endpoint.

This is a cross-cutting liveness/readiness probe, not a business domain, so it
lives under ``api/`` rather than ``domains/``. It verifies the DB connection so
the WS-1 Definition of Done (``/health`` returns 200 connected to the DB) is
actually exercised.
"""
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from sqlalchemy import text

from backend.config import settings
from backend.shared.database.connection import get_engine

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> JSONResponse:
    try:
        with get_engine().connect() as conn:
            conn.execute(text("SELECT 1"))
        db_up = True
    except Exception:
        db_up = False

    payload = {
        "status": "ok" if db_up else "degraded",
        "database": "up" if db_up else "down",
        "environment": settings.ENVIRONMENT,
        "version": settings.API_VERSION,
        "useMocks": settings.USE_MOCKS,
    }
    code = status.HTTP_200_OK if db_up else status.HTTP_503_SERVICE_UNAVAILABLE
    return JSONResponse(content=payload, status_code=code)
