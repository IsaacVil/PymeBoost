"""Login and current-user endpoints (User domain)."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.domains.user.schemas.auth_response import AuthResponse
from backend.domains.user.schemas.login_request import LoginRequest
from backend.domains.user.services.auth_service import AuthService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])
_service = AuthService()


@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    return _service.login(db, req)


@router.get("/me")
def me(principal: Principal = Depends(get_current_principal)) -> dict:
    return {
        "subjectId": principal.subject_id,
        "accountType": principal.account_type,
        "email": principal.email,
    }
