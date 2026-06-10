from pydantic import BaseModel

class BaseRateDTO(BaseModel):
    advisor_id: str
    rate: float
