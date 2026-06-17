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

    def list_conversations(self, db: Session, account_type: str, subject_id: str) -> list:
        """Matched chats of the principal with counterpart, contract status,
        whether a project exists (married) and the last message preview.

        Cross-domain read of matches/contracts/projects/profiles — accepted MVP
        deviation (README Agent Validations).
        """
        if account_type == "pyme":
            owner_col, cp_table, cp_name = 'm."pymeId"', '"PB_Advisors"', 'a."fullName"'
        else:
            owner_col, cp_table, cp_name = 'm."advisorId"', '"PB_Pymes"', 'a."companyName"'
        cp_join = 'm."advisorId"' if account_type == "pyme" else 'm."pymeId"'
        sql = text(
            f"""
            SELECT m."id"                AS match_id,
                   {cp_name}             AS counterpart_name,
                   a."description"       AS counterpart_role,
                   cs."code"            AS contract_status,
                   (p."id" IS NOT NULL)  AS married,
                   (SELECT msg."content"
                      FROM "PB_Messages" msg
                      JOIN "PB_ChatSessions" sess ON sess."id" = msg."chatSessionId"
                     WHERE sess."matchId" = m."id"
                     ORDER BY msg."createdAt" DESC
                     LIMIT 1)            AS last_message
              FROM "PB_Matches" m
              JOIN "PB_MatchStatus" mst ON mst."id" = m."matchStatusId"
              JOIN {cp_table} a ON a."id" = {cp_join}
              LEFT JOIN "PB_Contracts" c  ON c."matchId" = m."id"
              LEFT JOIN "PB_ContractStatus" cs ON cs."id" = c."contractStatusId"
              LEFT JOIN "PB_Projects" p ON p."contractVersionId" = c."currentVersionId"
             WHERE {owner_col} = :sid
               AND mst."code" IN ('match', 'finalized')
             ORDER BY m."createdAt"
            """
        )
        return list(db.execute(sql, {"sid": subject_id}).mappings().all())
