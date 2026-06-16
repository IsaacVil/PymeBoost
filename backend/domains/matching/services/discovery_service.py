"""Advisor discovery business logic (matching domain).

Reads available advisors via the repository, enriches each with the local mock-AI
recommendation data, and returns response DTOs (never raw ORM models).
"""
from sqlalchemy.orm import Session

from backend.domains.matching.repositories.discovery_repository import DiscoveryRepository
from backend.domains.matching.schemas.recommendation_response import (
    AdvisorGainDTO,
    AdvisorRecommendationResponse,
    SuccessMetricDTO,
)
from backend.domains.matching.services.recommendation_mock_ai import MockMatchingAI
from backend.shared.logging.logger import get_logger

logger = get_logger(__name__)

_ACCENTS = ["primary", "secondary", "success", "warning"]


def _monogram(name: str) -> str:
    parts = [p for p in name.split() if p]
    if len(parts) >= 2:
        return (parts[0][0] + parts[1][0]).upper()
    return name[:2].upper()


class DiscoveryService:
    def __init__(self, repository: DiscoveryRepository | None = None, ai: MockMatchingAI | None = None) -> None:
        self._repo = repository or DiscoveryRepository()
        self._ai = ai or MockMatchingAI()

    def discover_advisors(self, db: Session, pyme_id: str) -> list[AdvisorRecommendationResponse]:
        advisors = self._repo.find_available_advisors(db)
        logger.info("matching.discovery: %d advisors for pyme=%s", len(advisors), pyme_id)

        results: list[AdvisorRecommendationResponse] = []
        for i, a in enumerate(advisors):
            base_rate = int(a.base_rate or 150000)
            e = self._ai.enrich(str(a.id), base_rate)
            results.append(
                AdvisorRecommendationResponse(
                    advisor_id=str(a.id),
                    name=a.full_name,
                    monogram=_monogram(a.full_name),
                    role=a.description or "Asesor de negocios",
                    industry=e["industry"],
                    rating=float(a.reputation_score or 0),
                    reviews=int(a.rating_count or 0),
                    years=e["years"],
                    compat=e["compat"],
                    process=e["process"],
                    ai_objective=e["ai_objective"],
                    success_metric=SuccessMetricDTO(**e["success_metric"]),
                    advisor_gain=AdvisorGainDTO(**e["advisor_gain"]),
                    retainer=base_rate,
                    accent=_ACCENTS[i % len(_ACCENTS)],
                )
            )
        return results
