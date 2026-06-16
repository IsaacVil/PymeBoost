"""Authentication/authorization dependencies for FastAPI.

- ``get_current_principal``: extracts and validates the Bearer JWT (authn).
- ``require_account_type``: guards an endpoint by account type — 'pyme'/'advisor' (authz).

Per README §1.8, every protected endpoint validates the JWT and checks the
account type.
"""
from dataclasses import dataclass

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from backend.shared.auth.jwt_validator import JWTValidator
from backend.shared.exceptions.auth_exception import AuthException

_bearer = HTTPBearer(auto_error=True)
_jwt = JWTValidator()


@dataclass
class Principal:
    """The authenticated caller, derived from JWT claims."""

    subject_id: str       # PYME id or Advisor id
    account_type: str     # 'pyme' | 'advisor'
    email: str


class PermissionChecker:
    @staticmethod
    def check(user_role: str, required_role: str) -> bool:
        return user_role == required_role


def get_current_principal(
    creds: HTTPAuthorizationCredentials = Depends(_bearer),
) -> Principal:
    try:
        claims = _jwt.validate(creds.credentials)
    except AuthException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return Principal(
        subject_id=claims.get("sub", ""),
        account_type=claims.get("accountType", ""),
        email=claims.get("email", ""),
    )


def require_account_type(required: str):
    """Dependency factory: only allow callers whose account type matches."""

    def _guard(principal: Principal = Depends(get_current_principal)) -> Principal:
        if not PermissionChecker.check(principal.account_type, required):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"This endpoint requires a '{required}' account",
            )
        return principal

    return _guard
