from pydantic import BaseModel

class ImpactPredictionDTO(BaseModel):
    pyme_id: str
    advisor_id: str
    predicted_improvement: float
