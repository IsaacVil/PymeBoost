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

# Demo (ver database/scripts/seed_dev.sql): SOLO la PYME estrella del journey
# (Emma · Ropa Sol) autocarga un mensaje de contexto al abrirse el chat, para que
# el advisor reciba de entrada el baseline, el problema, el objetivo con métrica y
# el presupuesto. El resto de PYMEs abren el chat solo con el saludo del sistema.
_DEMO_EMMA_PYME_ID = "11111111-1111-1111-1111-111111111101"
_DEMO_EMMA_INTRO = (
    "Hola 👋 Soy Emma, de Ropa Sol (tienda de ropa: local físico + catálogo en línea).\n\n"
    "📊 Baseline actual: ~₡3.0M en ventas mensuales; la pauta digital convierte apenas 2.1%.\n"
    "🎯 Problema: pocas ventas en campañas pagadas — invertimos en anuncios pero se traduce en pocas compras.\n"
    "✅ Objetivo: subir la conversión de campañas de 2.1% a 3.4% (+25%) en 4 meses.\n"
    "💰 Presupuesto: ₡1.2M de implementación + ₡180k/mes de retainer.\n\n"
    "¿Te calza el reto? Me encantaría que trabajemos juntas. 🚀"
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

    def ensure_chat_session(self, db: Session, match_id: str, pyme_id: str | None = None) -> None:
        """Create the match's chat session + system greeting if it doesn't exist.

        For the demo PYME (Emma · Ropa Sol) also autoloads her context message so the
        advisor sees the baseline/problem/objective/budget the moment the chat opens.
        """
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

        # Demo: autoload Emma's PYME context message as the first user message.
        if pyme_id is not None and str(pyme_id) == _DEMO_EMMA_PYME_ID:
            user_type_id = db.execute(
                text('SELECT "id" FROM "PB_MessageTypes" WHERE "code" = \'user\'')
            ).scalar_one()
            pyme_account_type_id = db.execute(
                text('SELECT "id" FROM "PB_AccountTypes" WHERE "code" = \'pyme\'')
            ).scalar_one()
            db.execute(
                text(
                    'INSERT INTO "PB_Messages" '
                    '("chatSessionId", "messageTypeId", "senderAccountTypeId", "senderPymeId", "content") '
                    "VALUES (:s, :t, :at, :pid, :c)"
                ),
                {
                    "s": str(session_id),
                    "t": str(user_type_id),
                    "at": str(pyme_account_type_id),
                    "pid": str(pyme_id),
                    "c": _DEMO_EMMA_INTRO,
                },
            )
