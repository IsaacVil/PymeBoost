from pydantic import BaseModel

class HealthStatusDTO(BaseModel):
    project_id: str
    health_score: float
