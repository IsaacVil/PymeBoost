from pydantic import BaseModel

class RecommendationDTO(BaseModel):
    pyme_id: str
    advisor_id: str
    score: float
