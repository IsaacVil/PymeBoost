from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class MatchModel(Base):
    __tablename__ = "matches"
    id = Column(String, primary_key=True)
    pyme_id = Column(String, nullable=False)
    advisor_id = Column(String, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
