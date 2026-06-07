from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class ChatSessionModel(Base):
    __tablename__ = "chat_sessions"
    id = Column(String, primary_key=True)
    match_id = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
