"""GET the dashboard project tracking for a match (project domain)."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.domains.project.schemas.dashboard_response import DashboardResponse
from backend.domains.project.services.project_service import ProjectService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/projects", tags=["projects"])
_service = ProjectService()


@router.get("/active/tracking", response_model=DashboardResponse)
def get_active_dashboard(
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> DashboardResponse:
    """Tracking of the authenticated user's active project (no match_id needed)."""
    return _service.get_active_tracking(db, principal)


@router.get("/match/{match_id}/tracking", response_model=DashboardResponse)
def get_dashboard(
    match_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> DashboardResponse:
    return _service.get_tracking_by_match(db, match_id, principal)
