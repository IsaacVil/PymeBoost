from pydantic import BaseModel

class MessageResponse(BaseModel):
    id: str
    content: str
    sender_id: str
    sent_at: str
