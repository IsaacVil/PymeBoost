"""Matching business logic — swipe decisions.

A right swipe creates/updates the PB_Matches row to status 'match'; a left swipe
to 'not_swiped'. Idempotent per (pyme, advisor). Publishes domain events AFTER
persistence (Observer via the in-process event bus). Returns a DTO, never a model.
"""
from sqlalchemy.orm import Session

from backend.domains.matching.events.match_created_event import MatchCreatedEvent
from backend.domains.matching.events.match_swiped_event import MatchSwipedEvent
from backend.domains.matching.models.match_model import MatchModel
from backend.domains.matching.repositories.match_repository import MatchRepository
from backend.domains.matching.schemas.match_response import MatchResponse
from backend.shared.events.event_bus import event_bus
from backend.shared.exceptions.validation_exception import ValidationException
from backend.shared.logging.logger import get_logger

logger = get_logger(__name__)


class MatchingService:
    def __init__(self, repository: MatchRepository | None = None) -> None:
        self._repo = repository or MatchRepository()

    def create_swipe_decision(self, db: Session, pyme_id: str, advisor_id: str, approved: bool) -> MatchResponse:
        code = "match" if approved else "not_swiped"
        status_id = self._repo.status_id_by_code(db, code)
        if status_id is None:
            raise ValidationException(f"Unknown match status: {code}")

        existing = self._repo.find_by_pair(db, pyme_id, advisor_id)
        if existing is not None:
            existing.match_status_id = status_id
            match = existing
        else:
            match = MatchModel(pyme_id=pyme_id, advisor_id=advisor_id, match_status_id=status_id)
            self._repo.save(db, match)

        db.commit()
        db.refresh(match)

        # Publish AFTER successful persistence.
        event_bus.publish(MatchSwipedEvent(pyme_id=pyme_id, advisor_id=advisor_id, approved=approved))
        if approved:
            event_bus.publish(MatchCreatedEvent(match_id=str(match.id), pyme_id=pyme_id, advisor_id=advisor_id))

        logger.info("matching.swipe pyme=%s advisor=%s approved=%s -> %s", pyme_id, advisor_id, approved, code)
        return MatchResponse(id=str(match.id), pyme_id=pyme_id, advisor_id=advisor_id, status=code)
