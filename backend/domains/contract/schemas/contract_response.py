from pydantic import BaseModel

class ContractResponse(BaseModel):
    id: str
    match_id: str
    status: str
    budget: float
