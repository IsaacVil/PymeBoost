"""Data access for advisor discovery (matching domain).

Repository pattern + ORM only. Reads available advisors from PB_Advisors.

NOTE (local MVP deviation — see README Agent Validations): the README architecture
mandates cross-domain data via the advisor domain's REST API + an ACL translator
(never importing another domain's model). For the local MVP we read PB_Advisors
directly through the advisor ORM model. Documented simplification, to be refactored
to ACL/REST in a fuller build.
"""
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.domains.advisor.models.advisor_model import AdvisorModel


class DiscoveryRepository:
    def find_available_advisors(self, db: Session) -> list[AdvisorModel]:
        stmt = (
            select(AdvisorModel)
            .where(AdvisorModel.is_available.is_(True))
            .order_by(AdvisorModel.reputation_score.desc())
        )
        return list(db.execute(stmt).scalars().all())
