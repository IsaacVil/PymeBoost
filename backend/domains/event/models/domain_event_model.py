from sqlalchemy import Column, String, DateTime, JSON
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class DomainEventModel(Base):
    __tablename__ = "domain_events"
    id = Column(String, primary_key=True)
    event_type = Column(String, nullable=False)
    payload = Column(JSON, nullable=False)
    occurred_at = Column(DateTime, nullable=False)
