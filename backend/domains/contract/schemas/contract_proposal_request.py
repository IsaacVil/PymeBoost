from pydantic import BaseModel

class ContractProposalRequest(BaseModel):
    match_id: str
    budget: float
    duration_days: int
    deliverables: str
