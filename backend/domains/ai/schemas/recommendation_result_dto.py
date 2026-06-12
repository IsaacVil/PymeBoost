from pydantic import BaseModel

class RecommendationResultDTO(BaseModel):
    pyme_id: str
    advisor_id: str
    score: float
