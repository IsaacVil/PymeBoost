"""Data access for matches (matching domain). Repository pattern, ORM only."""
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.domains.matching.models.match_model import MatchModel
from backend.domains.matching.models.match_status_model import MatchStatusModel


class MatchRepository:
    def find_by_pair(self, db: Session, pyme_id: str, advisor_id: str) -> MatchModel | None:
        stmt = select(MatchModel).where(
            MatchModel.pyme_id == pyme_id,
            MatchModel.advisor_id == advisor_id,
        )
        return db.execute(stmt).scalar_one_or_none()

    def status_id_by_code(self, db: Session, code: str) -> str | None:
        stmt = select(MatchStatusModel.id).where(MatchStatusModel.code == code)
        row = db.execute(stmt).scalar_one_or_none()
        return str(row) if row is not None else None

    def save(self, db: Session, match: MatchModel) -> MatchModel:
        db.add(match)
        db.flush()
        return match
