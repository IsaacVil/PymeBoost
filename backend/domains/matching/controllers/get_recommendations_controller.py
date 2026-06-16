"""GET advisor recommendations for a PYME (matching discovery)."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.domains.matching.schemas.recommendation_response import AdvisorRecommendationResponse
from backend.domains.matching.services.discovery_service import DiscoveryService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/matching", tags=["matching"])
_service = DiscoveryService()


@router.get("/recommendations/{pyme_id}", response_model=list[AdvisorRecommendationResponse])
def get_recommendations(
    pyme_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> list[AdvisorRecommendationResponse]:
    # Ownership: only the authenticated PYME can read its own recommendations.
    if principal.account_type != "pyme" or principal.subject_id != pyme_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the owning PYME can view its recommendations",
        )
    return _service.discover_advisors(db, pyme_id)
