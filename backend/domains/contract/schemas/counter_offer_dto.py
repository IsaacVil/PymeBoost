from pydantic import BaseModel

class CounterOfferDTO(BaseModel):
    contract_id: str
    proposed_budget: float
    proposed_duration_days: int
