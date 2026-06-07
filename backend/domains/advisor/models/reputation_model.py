from sqlalchemy import Column, String, Float
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class ReputationModel(Base):
    __tablename__ = "reputations"
    id = Column(String, primary_key=True)
    advisor_id = Column(String, nullable=False)
    score = Column(Float, nullable=False)
