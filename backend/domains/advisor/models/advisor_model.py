"""ORM model for PB_Advisors (advisor profile).

Maps the real schema in database/scripts/creationScript.sql §2. Columns with DB
defaults (id, isAvailable, reputationScore, ratingCount, timestamps) are omitted
on insert and filled by Postgres.
"""
from sqlalchemy import Boolean, Column, DateTime, Integer, Numeric, String, Text, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class AdvisorModel(Base):
    __tablename__ = "PB_Advisors"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    auth0_id = Column("auth0Id", String(64), nullable=False, unique=True)
    full_name = Column("fullName", String(100), nullable=False)
    display_name = Column("displayName", String(100), nullable=True)
    personal_email = Column("personalEmail", String(150), nullable=False, unique=True)
    phone = Column("phone", String(20), nullable=False, unique=True)
    linkedin_url = Column("linkedinUrl", String(500), nullable=False)
    description = Column("description", Text, nullable=True)
    base_rate = Column("baseRate", Numeric(14, 2), nullable=True)
    is_available = Column("isAvailable", Boolean, nullable=False, server_default=text("true"))
    advisor_status_id = Column("advisorStatusId", UUID(as_uuid=False), nullable=False)
    reputation_score = Column("reputationScore", Numeric(12, 8), nullable=False, server_default=text("0"))
    rating_count = Column("ratingCount", Integer, nullable=False, server_default=text("0"))
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
    updated_at = Column("updatedAt", DateTime(timezone=True), server_default=text("now()"))
