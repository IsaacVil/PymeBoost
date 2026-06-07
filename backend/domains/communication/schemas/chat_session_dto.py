from pydantic import BaseModel

class ChatSessionDTO(BaseModel):
    id: str
    match_id: str
