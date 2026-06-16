"""POST a swipe decision (matching domain)."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.domains.matching.schemas.match_response import MatchResponse
from backend.domains.matching.schemas.swipe_request import SwipeRequest
from backend.domains.matching.services.matching_service import MatchingService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/matching", tags=["matching"])
_service = MatchingService()


@router.post("/swipe", response_model=MatchResponse, status_code=status.HTTP_201_CREATED)
def create_swipe_decision(
    req: SwipeRequest,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> MatchResponse:
    # Ownership: only the authenticated PYME may swipe on its own behalf.
    if principal.account_type != "pyme" or principal.subject_id != req.pyme_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the owning PYME can swipe")
    return _service.create_swipe_decision(db, req.pyme_id, req.advisor_id, req.approved)
