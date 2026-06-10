from pydantic import BaseModel

class MessageRequest(BaseModel):
    content: str
    sender_id: str
