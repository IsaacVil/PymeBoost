from pydantic import BaseModel

class NotificationDTO(BaseModel):
    id: str
    user_id: str
    message: str
    read: bool
