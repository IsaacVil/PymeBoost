from pydantic import BaseModel, Field


class ProposeContractRequest(BaseModel):
    """A contract proposal / counter-offer, aligned with the frontend Contract model.

    ``advisor_result_pct`` is the advisor's share of the verified improvement; it is
    persisted in PB_ContractVersions.advisorResultProfit (kept as a percent value,
    matching how the read DTO surfaces it).
    """

    budget: float = Field(ge=0)
    retainer: float = Field(ge=0)
    commission_pct: float = Field(ge=0)
    advisor_result_pct: float = Field(default=0, ge=0)
    objective: str = Field(min_length=1)
    start_date: str  # ISO date (YYYY-MM-DD)
    end_date: str    # ISO date (YYYY-MM-DD)
