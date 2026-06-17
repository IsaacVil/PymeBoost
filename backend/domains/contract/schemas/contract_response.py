from pydantic import BaseModel


class ContractResponse(BaseModel):
    id: str
    match_id: str
    status: str  # negotiating | accepted | rejected | voided
    proposed_by: str | None = None  # 'pyme' | 'advisor' — who sent the current version
    budget: float
    retainer: float
    commission_pct: float
    advisor_result_pct: float
    start_date: str
    end_date: str
    objective: str
