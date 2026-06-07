from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class MessageModel(Base):
    __tablename__ = "messages"
    id = Column(String, primary_key=True)
    session_id = Column(String, nullable=False)
    sender_id = Column(String, nullable=False)
    content = Column(String, nullable=False)
    sent_at = Column(DateTime, nullable=False)
