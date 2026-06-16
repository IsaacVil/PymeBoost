"""Local JWT issuing and validation (HS256).

Local-profile replacement for Auth0 JWT validation (see docs/mvpspec.md §2.3).
Because the secret is symmetric, both signing (login) and verification live here
for cohesion. The Auth0 ``get_jwks`` flow does not apply locally.
"""
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt

from backend.config import settings
from backend.shared.exceptions.auth_exception import AuthException


class JWTValidator:
    def create_access_token(self, claims: dict) -> str:
        now = datetime.now(timezone.utc)
        payload = {
            **claims,
            "iat": now,
            "exp": now + timedelta(minutes=settings.JWT_EXPIRE_MINUTES),
        }
        return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

    def validate(self, token: str) -> dict:
        try:
            return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        except JWTError as exc:
            raise AuthException("Invalid or expired token") from exc
