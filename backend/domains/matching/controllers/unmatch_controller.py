"""POST an unmatch (matching domain) — either participant cancels the match."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.domains.matching.schemas.match_response import MatchResponse
from backend.domains.matching.services.matching_service import MatchingService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/matching", tags=["matching"])
_service = MatchingService()


@router.post("/matches/{match_id}/unmatch", response_model=MatchResponse)
def unmatch(
    match_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> MatchResponse:
    return _service.unmatch(db, match_id, principal)
