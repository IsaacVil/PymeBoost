from pydantic import BaseModel

class AdvisorProfileResponse(BaseModel):
    id: str
    full_name: str
    base_rate: float
    reputation_score: float
