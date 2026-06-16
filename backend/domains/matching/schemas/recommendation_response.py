"""Response DTOs for advisor recommendations (matching discovery).

Outbound contract consumed by the frontend deck. Never exposes raw ORM fields.
The rich "AI" fields are produced by the local mock-AI service (USE_MOCKS), not
stored in the DB.
"""
from pydantic import BaseModel


class SuccessMetricDTO(BaseModel):
    label: str
    before: str
    after: str
    delta: str


class AdvisorGainDTO(BaseModel):
    pct: int
    basis: str
    est: int
    months: int


class AdvisorRecommendationResponse(BaseModel):
    advisor_id: str
    name: str
    monogram: str
    role: str
    industry: str
    rating: float
    reviews: int
    years: int
    compat: int  # 1..5
    process: str
    ai_objective: str
    success_metric: SuccessMetricDTO
    advisor_gain: AdvisorGainDTO
    retainer: int
    accent: str
