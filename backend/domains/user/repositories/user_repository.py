"""Data access for authentication/account creation.

Owns all DB access for the auth flow: credential lookups, catalog-code → id
resolution, and inserting PYME/Advisor profiles + credentials. Services never
touch the Session directly (README §2.2: services delegate persistence to
repositories).
"""
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from backend.domains.advisor.models.advisor_model import AdvisorModel
from backend.domains.pyme.models.pyme_model import PymeModel
from backend.domains.user.models.auth_credential_model import AuthCredentialModel


class UserRepository:
    # --- credentials -------------------------------------------------------
    def find_credential_by_email(self, db: Session, email: str) -> AuthCredentialModel | None:
        return db.execute(
            select(AuthCredentialModel).where(AuthCredentialModel.email == email)
        ).scalar_one_or_none()

    def email_taken(self, db: Session, email: str) -> bool:
        return self.find_credential_by_email(db, email) is not None

    def add_credential(self, db: Session, credential: AuthCredentialModel) -> AuthCredentialModel:
        db.add(credential)
        db.flush()
        return credential

    # --- profiles ----------------------------------------------------------
    def add_pyme(self, db: Session, pyme: PymeModel) -> PymeModel:
        db.add(pyme)
        db.flush()
        return pyme

    def add_advisor(self, db: Session, advisor: AdvisorModel) -> AdvisorModel:
        db.add(advisor)
        db.flush()
        return advisor

    # --- catalog lookups (code -> id) --------------------------------------
    def _lookup(self, db: Session, table: str, code: str) -> str | None:
        row = db.execute(
            text(f'SELECT "id" FROM "{table}" WHERE "code" = :code'), {"code": code}
        ).scalar_one_or_none()
        return str(row) if row is not None else None

    def account_type_id(self, db: Session, code: str) -> str | None:
        return self._lookup(db, "PB_AccountTypes", code)

    def company_size_id(self, db: Session, code: str) -> str | None:
        return self._lookup(db, "PB_CompanySizes", code)

    def pyme_status_id(self, db: Session, code: str) -> str | None:
        return self._lookup(db, "PB_PymeStatus", code)

    def advisor_status_id(self, db: Session, code: str) -> str | None:
        return self._lookup(db, "PB_AdvisorStatus", code)

    def industry_id(self, db: Session, code: str) -> str | None:
        return self._lookup(db, "PB_Industries", code)
