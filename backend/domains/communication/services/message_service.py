"""Messaging business logic (communication domain).

Enforces participant-only access and the on-platform contact rule, persists
messages and publishes MessageSent after persistence. Returns DTOs, never models.
"""
from sqlalchemy.orm import Session

from backend.domains.communication.events.message_sent_event import MessageSentEvent
from backend.domains.communication.models.message_model import MessageModel
from backend.domains.communication.repositories.message_repository import MessageRepository
from backend.domains.communication.schemas.message_response import MessageResponse
from backend.domains.communication.services.contact_scanner import ContactScanner
from backend.shared.auth.permission_checker import Principal
from backend.shared.events.event_bus import event_bus
from backend.shared.exceptions.domain_exception import DomainException
from backend.shared.exceptions.forbidden_exception import ForbiddenException
from backend.shared.exceptions.not_found_exception import NotFoundException
from backend.shared.logging.logger import get_logger

logger = get_logger(__name__)


class MessageService:
    def __init__(self, repository: MessageRepository | None = None) -> None:
        self._repo = repository or MessageRepository()

    def list_messages(self, db: Session, match_id: str, principal: Principal) -> list[MessageResponse]:
        self._assert_participant(db, match_id, principal)
        session = self._repo.find_session_by_match(db, match_id)
        if session is None:
            raise NotFoundException("ChatSession", match_id)
        user_type_id = self._repo.message_type_id_by_code(db, "user")
        messages = self._repo.list_messages(db, str(session.id))
        return [self._to_dto(m, user_type_id) for m in messages]

    def send_message(self, db: Session, match_id: str, content: str, principal: Principal) -> MessageResponse:
        self._assert_participant(db, match_id, principal)

        # Business rule: no off-platform contact sharing.
        blocked = ContactScanner.scan(content)
        if blocked is not None:
            raise DomainException(f"Mensaje bloqueado: parece contener {blocked}. La comunicación debe ocurrir dentro de PymeBoost.")

        session = self._repo.find_session_by_match(db, match_id)
        if session is None:
            raise NotFoundException("ChatSession", match_id)

        user_type_id = self._repo.message_type_id_by_code(db, "user")
        account_type_id = self._repo.account_type_id_by_code(db, principal.account_type)
        if user_type_id is None or account_type_id is None:
            raise DomainException("Catálogo de mensajes/cuentas incompleto")

        message = MessageModel(
            chat_session_id=str(session.id),
            message_type_id=user_type_id,
            sender_account_type_id=account_type_id,
            sender_pyme_id=principal.subject_id if principal.account_type == "pyme" else None,
            sender_advisor_id=principal.subject_id if principal.account_type == "advisor" else None,
            content=content,
        )
        self._repo.save_message(db, message)
        db.commit()
        db.refresh(message)

        event_bus.publish(MessageSentEvent(
            message_id=str(message.id), chat_session_id=str(session.id), match_id=match_id, sender=principal.account_type,
        ))
        logger.info("communication.message sent match=%s sender=%s", match_id, principal.account_type)
        return self._to_dto(message, user_type_id)

    # --- helpers -----------------------------------------------------------
    def _assert_participant(self, db: Session, match_id: str, principal: Principal) -> None:
        match = self._repo.find_match(db, match_id)
        if match is None:
            raise NotFoundException("Match", match_id)
        is_participant = (
            (principal.account_type == "pyme" and str(match.pyme_id) == principal.subject_id)
            or (principal.account_type == "advisor" and str(match.advisor_id) == principal.subject_id)
        )
        if not is_participant:
            raise ForbiddenException("No sos participante de este chat")

    @staticmethod
    def _to_dto(m: MessageModel, user_type_id: str | None) -> MessageResponse:
        if m.sender_pyme_id:
            sender = "pyme"
        elif m.sender_advisor_id:
            sender = "advisor"
        else:
            sender = "system"
        message_type = "user" if str(m.message_type_id) == str(user_type_id) else "system"
        return MessageResponse(
            id=str(m.id),
            content=m.content,
            sender=sender,
            message_type=message_type,
            created_at=m.created_at.isoformat() if m.created_at else "",
        )
