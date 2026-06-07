from pydantic import BaseModel

class MatchResponse(BaseModel):
    id: str
    pyme_id: str
    advisor_id: str
    status: str
