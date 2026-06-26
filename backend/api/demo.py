"""Demo-only utility: reset the transactional state to the seeded baseline.

Cross-cutting dev utility (not a business domain), so it lives under ``api/``
like ``health``. Local profile only (USE_MOCKS): lets the presenter re-run the
Emma/Maria journey from a clean slate — Emma back to empty messaging + empty
dashboard, Maria's seeded opportunities and the mid-plan contract restored —
without recreating the database. Runs database/scripts/reset_demo.sql.
"""
from pathlib import Path

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

from backend.config import settings
from backend.shared.database.session import get_session

router = APIRouter(prefix="/api/demo", tags=["demo"])

# backend/api/demo.py -> parents[2] is the repo root.
_RESET_SQL = Path(__file__).resolve().parents[2] / "database" / "scripts" / "reset_demo.sql"


@router.post("/reset")
def reset_demo() -> JSONResponse:
    if not settings.USE_MOCKS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Demo reset disabled")
    if not _RESET_SQL.exists():
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="reset_demo.sql not found")

    sql = _RESET_SQL.read_text(encoding="utf-8")
    db = get_session()
    try:
        # Run the multi-statement script straight through the raw DBAPI cursor.
        # Passing no params means psycopg2 does NO '%' interpolation, so literal
        # percent signs in the SQL (e.g. "un 30%") are left untouched.
        raw = db.connection().connection
        cursor = raw.cursor()
        try:
            cursor.execute(sql)
        finally:
            cursor.close()
        db.commit()
    except Exception as exc:  # pragma: no cover - surfaced to the caller
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Reset failed: {exc}") from exc
    finally:
        db.close()

    return JSONResponse(content={"status": "ok", "message": "Demo restablecida al estado inicial."})
