"""ORM model for PB_MatchStatus (catalog).

Read-only lookup used by the repository to resolve a status code
(waiting_swipe / match / not_swiped / unmatch / finalized) to its id.
"""
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class MatchStatusModel(Base):
    __tablename__ = "PB_MatchStatus"

    id = Column("id", UUID(as_uuid=False), primary_key=True)
    code = Column("code", String(50), nullable=False, unique=True)
    name = Column("name", String(100), nullable=False)
