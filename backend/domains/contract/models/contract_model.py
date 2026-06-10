from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class ContractModel(Base):
    __tablename__ = "contracts"
    id = Column(String, primary_key=True)
    match_id = Column(String, nullable=False)
    status = Column(String, nullable=False)
    budget = Column(Float, nullable=True)
    duration_days = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False)
