from pydantic import BaseModel

class UserResponse(BaseModel):
    id: str
    email: str
    account_type: str
