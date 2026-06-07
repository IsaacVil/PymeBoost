from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class SessionModel(Base):
    __tablename__ = "sessions"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    expires_at = Column(DateTime, nullable=False)
