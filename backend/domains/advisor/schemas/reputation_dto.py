from pydantic import BaseModel

class ReputationDTO(BaseModel):
    advisor_id: str
    score: float
