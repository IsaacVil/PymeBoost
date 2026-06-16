"""Create PYME (SME) account endpoint (User domain)."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from backend.domains.user.schemas.auth_response import AuthResponse
from backend.domains.user.schemas.create_sme_request import CreateSmeRequest
from backend.domains.user.services.auth_service import AuthService
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/sme", tags=["accounts"])
_service = AuthService()


@router.post("/accounts", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def create_sme_account(req: CreateSmeRequest, db: Session = Depends(get_db)) -> AuthResponse:
    return _service.register_pyme(db, req)
