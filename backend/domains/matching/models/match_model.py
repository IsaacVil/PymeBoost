"""ORM model for PB_Matches — unified swipe + match table.

Maps the real schema (creationScript.sql §6). Status lives in PB_MatchStatus
(waiting_swipe → match | not_swiped ; match → unmatch | finalized). UNIQUE
(pymeId, advisorId) makes a swipe idempotent per pyme–advisor pair.
"""
from sqlalchemy import Column, DateTime, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class MatchModel(Base):
    __tablename__ = "PB_Matches"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    pyme_id = Column("pymeId", UUID(as_uuid=False), nullable=False)
    advisor_id = Column("advisorId", UUID(as_uuid=False), nullable=False)
    match_status_id = Column("matchStatusId", UUID(as_uuid=False), nullable=False)
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
