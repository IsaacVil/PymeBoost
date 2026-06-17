"""Data access for matches (matching domain). Repository pattern, ORM only.

Provisioning the chat session on a right swipe writes PB_ChatSessions/PB_Messages
(communication domain) via parameterized text() — an accepted MVP cross-domain
deviation (README Agent Validations) so the conversation exists the moment a match
is made, without coupling to the communication ORM models.
"""
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from backend.domains.matching.models.match_model import MatchModel
from backend.domains.matching.models.match_status_model import MatchStatusModel

_MATCH_GREETING = (
    "¡Hicieron match! Pueden coordinar los detalles de la asesoría por este chat."
)


class MatchRepository:
    def find_by_pair(self, db: Session, pyme_id: str, advisor_id: str) -> MatchModel | None:
        stmt = select(MatchModel).where(
            MatchModel.pyme_id == pyme_id,
            MatchModel.advisor_id == advisor_id,
        )
        return db.execute(stmt).scalar_one_or_none()

    def find_by_id(self, db: Session, match_id: str) -> MatchModel | None:
        return db.execute(select(MatchModel).where(MatchModel.id == match_id)).scalar_one_or_none()

    def status_id_by_code(self, db: Session, code: str) -> str | None:
        stmt = select(MatchStatusModel.id).where(MatchStatusModel.code == code)
        row = db.execute(stmt).scalar_one_or_none()
        return str(row) if row is not None else None

    def status_code_by_id(self, db: Session, status_id: str) -> str | None:
        stmt = select(MatchStatusModel.code).where(MatchStatusModel.id == status_id)
        row = db.execute(stmt).scalar_one_or_none()
        return str(row) if row is not None else None

    def save(self, db: Session, match: MatchModel) -> MatchModel:
        db.add(match)
        db.flush()
        return match

    def ensure_chat_session(self, db: Session, match_id: str) -> None:
        """Create the match's chat session + system greeting if it doesn't exist."""
        existing = db.execute(
            text('SELECT "id" FROM "PB_ChatSessions" WHERE "matchId" = :m'), {"m": match_id}
        ).scalar_one_or_none()
        if existing is not None:
            return
        session_id = db.execute(
            text('INSERT INTO "PB_ChatSessions" ("matchId", "isActive") VALUES (:m, TRUE) RETURNING "id"'),
            {"m": match_id},
        ).scalar_one()
        system_type_id = db.execute(
            text('SELECT "id" FROM "PB_MessageTypes" WHERE "code" = \'system\'')
        ).scalar_one()
        db.execute(
            text(
                'INSERT INTO "PB_Messages" ("chatSessionId", "messageTypeId", "content") '
                "VALUES (:s, :t, :c)"
            ),
            {"s": str(session_id), "t": str(system_type_id), "c": _MATCH_GREETING},
        )
