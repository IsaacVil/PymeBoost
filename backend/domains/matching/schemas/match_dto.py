from pydantic import BaseModel

class MatchDTO(BaseModel):
    id: str
    pyme_id: str
    advisor_id: str
    status: str
