"""Dashboard ("Mi Contrato") tracking response DTOs."""
from pydantic import BaseModel


class ObjectiveDTO(BaseModel):
    label: str
    done: bool


class PhaseDTO(BaseModel):
    name: str
    status: str  # completed | active | pending
    objectives: list[ObjectiveDTO]


class KpiDTO(BaseModel):
    label: str
    before: str
    after: str
    positive: bool


class DeliverableDTO(BaseModel):
    label: str
    done: bool


class CounterpartDTO(BaseModel):
    name: str
    monogram: str
    role: str


class ContractTermsDTO(BaseModel):
    status: str
    budget: float
    retainer: float
    duration_months: int
    commission_pct: float
    advisor_result_pct: float
    start_date: str
    end_date: str
    objective: str


class DashboardResponse(BaseModel):
    counterpart: CounterpartDTO
    contract: ContractTermsDTO
    phases: list[PhaseDTO]
    kpis: list[KpiDTO]
    deliverables: list[DeliverableDTO]
