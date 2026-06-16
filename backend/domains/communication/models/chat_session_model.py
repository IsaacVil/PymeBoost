"""ORM model for PB_ChatSessions (one chat per match)."""
from sqlalchemy import Boolean, Column, DateTime, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class ChatSessionModel(Base):
    __tablename__ = "PB_ChatSessions"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    match_id = Column("matchId", UUID(as_uuid=False), nullable=False, unique=True)
    is_active = Column("isActive", Boolean, nullable=False, server_default=text("true"))
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
