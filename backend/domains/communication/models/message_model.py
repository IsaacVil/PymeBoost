"""ORM model for PB_Messages (chat messages).

Sender is polymorphic: a user message sets exactly one of senderPymeId/senderAdvisorId;
a system message leaves both NULL (see creationScript.sql §7).
"""
from sqlalchemy import Column, DateTime, Text, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class MessageModel(Base):
    __tablename__ = "PB_Messages"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    chat_session_id = Column("chatSessionId", UUID(as_uuid=False), nullable=False)
    message_type_id = Column("messageTypeId", UUID(as_uuid=False), nullable=False)
    sender_account_type_id = Column("senderAccountTypeId", UUID(as_uuid=False), nullable=True)
    sender_pyme_id = Column("senderPymeId", UUID(as_uuid=False), nullable=True)
    sender_advisor_id = Column("senderAdvisorId", UUID(as_uuid=False), nullable=True)
    content = Column("content", Text, nullable=False)
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
