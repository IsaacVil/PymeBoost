"""Create Advisor account endpoint (User domain)."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.domains.user.schemas.auth_response import AuthResponse
from backend.domains.user.schemas.create_advisor_request import CreateAdvisorRequest
from backend.domains.user.services.auth_service import AuthService
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/advisor", tags=["accounts"])
_service = AuthService()


@router.post("/accounts", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def create_advisor_account(req: CreateAdvisorRequest, db: Session = Depends(get_db)) -> AuthResponse:
    return _service.register_advisor(db, req)
