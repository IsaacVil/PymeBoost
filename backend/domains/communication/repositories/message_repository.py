"""Data access for chat sessions and messages (communication domain).

Repository pattern. Catalog code→id lookups use parameterized `text()` (same
accepted pattern as the user domain — no ORM model per catalog table). Reading
PB_Matches is a cross-domain participant check (accepted MVP deviation — see
README Agent Validations; should be an ACL/REST call in a fuller build).
"""
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from backend.domains.communication.models.chat_session_model import ChatSessionModel
from backend.domains.communication.models.message_model import MessageModel
from backend.domains.matching.models.match_model import MatchModel  # cross-domain read (MVP)


class MessageRepository:
    def find_match(self, db: Session, match_id: str) -> MatchModel | None:
        return db.execute(select(MatchModel).where(MatchModel.id == match_id)).scalar_one_or_none()

    def find_session_by_match(self, db: Session, match_id: str) -> ChatSessionModel | None:
        return db.execute(
            select(ChatSessionModel).where(ChatSessionModel.match_id == match_id)
        ).scalar_one_or_none()

    def list_messages(self, db: Session, chat_session_id: str) -> list[MessageModel]:
        stmt = (
            select(MessageModel)
            .where(MessageModel.chat_session_id == chat_session_id)
            .order_by(MessageModel.created_at)
        )
        return list(db.execute(stmt).scalars().all())

    def save_message(self, db: Session, message: MessageModel) -> MessageModel:
        db.add(message)
        db.flush()
        return message

    def message_type_id_by_code(self, db: Session, code: str) -> str | None:
        row = db.execute(
            text('SELECT "id" FROM "PB_MessageTypes" WHERE "code" = :code'), {"code": code}
        ).scalar_one_or_none()
        return str(row) if row is not None else None

    def account_type_id_by_code(self, db: Session, code: str) -> str | None:
        row = db.execute(
            text('SELECT "id" FROM "PB_AccountTypes" WHERE "code" = :code'), {"code": code}
        ).scalar_one_or_none()
        return str(row) if row is not None else None
