from pydantic import BaseModel


class MessageResponse(BaseModel):
    id: str
    content: str
    sender: str  # 'pyme' | 'advisor' | 'system'
    message_type: str  # 'user' | 'system'
    created_at: str
