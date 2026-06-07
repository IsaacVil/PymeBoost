from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class NegotiationModel(Base):
    __tablename__ = "negotiations"
    id = Column(String, primary_key=True)
    contract_id = Column(String, nullable=False)
    proposed_by = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
