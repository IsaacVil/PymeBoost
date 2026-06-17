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
from backend.shared.auth.permission_checker import Principal
from backend.shared.events.event_bus import event_bus
from backend.shared.exceptions.domain_exception import DomainException
from backend.shared.exceptions.forbidden_exception import ForbiddenException
from backend.shared.exceptions.not_found_exception import NotFoundException
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

        # A right swipe opens the chat so the advisor shows up in messaging at once.
        if approved:
            self._repo.ensure_chat_session(db, str(match.id))

        db.commit()
        db.refresh(match)

        # Publish AFTER successful persistence.
        event_bus.publish(MatchSwipedEvent(pyme_id=pyme_id, advisor_id=advisor_id, approved=approved))
        if approved:
            event_bus.publish(MatchCreatedEvent(match_id=str(match.id), pyme_id=pyme_id, advisor_id=advisor_id))

        logger.info("matching.swipe pyme=%s advisor=%s approved=%s -> %s", pyme_id, advisor_id, approved, code)
        return MatchResponse(id=str(match.id), pyme_id=pyme_id, advisor_id=advisor_id, status=code)

    def unmatch(self, db: Session, match_id: str, principal: Principal) -> MatchResponse:
        """Either participant cancels the match. Blocked once a contract is active
        (match 'finalized'). Sets status 'unmatch' so it drops out of the chat list."""
        match = self._repo.find_by_id(db, match_id)
        if match is None:
            raise NotFoundException("Match", match_id)
        is_participant = (
            (principal.account_type == "pyme" and str(match.pyme_id) == principal.subject_id)
            or (principal.account_type == "advisor" and str(match.advisor_id) == principal.subject_id)
        )
        if not is_participant:
            raise ForbiddenException("No sos participante de este match")

        current_code = self._repo.status_code_by_id(db, str(match.match_status_id))
        if current_code == "finalized":
            raise DomainException("No se puede deshacer un match con un contrato activo.")

        unmatch_id = self._repo.status_id_by_code(db, "unmatch")
        if unmatch_id is None:
            raise ValidationException("Unknown match status: unmatch")
        match.match_status_id = unmatch_id
        db.commit()
        db.refresh(match)

        logger.info("matching.unmatch match=%s by=%s", match_id, principal.account_type)
        return MatchResponse(id=str(match.id), pyme_id=str(match.pyme_id), advisor_id=str(match.advisor_id), status="unmatch")
