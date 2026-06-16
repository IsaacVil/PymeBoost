from pydantic import BaseModel


class AuthResponse(BaseModel):
    """Returned by login and register: the JWT plus identity summary."""

    access_token: str
    token_type: str = "bearer"
    account_type: str  # 'pyme' | 'advisor'
    subject_id: str
    email: str
