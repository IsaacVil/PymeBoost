"""Data access for contracts (contract domain). Repository pattern, ORM only.

Cross-domain participant read of PB_Matches is an accepted MVP deviation (see
README Agent Validations). Contract-status code is a catalog lookup via text()
(same accepted pattern as other domains).
"""
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from backend.domains.contract.models.contract_model import ContractModel
from backend.domains.contract.models.contract_version_model import ContractVersionModel
from backend.domains.matching.models.match_model import MatchModel  # cross-domain read (MVP)


class ContractRepository:
    def find_match(self, db: Session, match_id: str) -> MatchModel | None:
        return db.execute(select(MatchModel).where(MatchModel.id == match_id)).scalar_one_or_none()

    def find_by_match(self, db: Session, match_id: str) -> ContractModel | None:
        return db.execute(
            select(ContractModel).where(ContractModel.match_id == match_id)
        ).scalar_one_or_none()

    def find_version(self, db: Session, version_id: str) -> ContractVersionModel | None:
        return db.execute(
            select(ContractVersionModel).where(ContractVersionModel.id == version_id)
        ).scalar_one_or_none()

    def status_code_by_id(self, db: Session, status_id: str) -> str | None:
        row = db.execute(
            text('SELECT "code" FROM "PB_ContractStatus" WHERE "id" = :id'), {"id": status_id}
        ).scalar_one_or_none()
        return str(row) if row is not None else None
