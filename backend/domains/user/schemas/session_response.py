from pydantic import BaseModel

class SessionResponse(BaseModel):
    session_id: str
    user_id: str
    expires_at: str
