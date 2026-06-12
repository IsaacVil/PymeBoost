from sqlalchemy import Column, String, Float
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class RecommendationResultModel(Base):
    __tablename__ = "recommendation_results"
    id = Column(String, primary_key=True)
    pyme_id = Column(String, nullable=False)
    advisor_id = Column(String, nullable=False)
    score = Column(Float, nullable=False)
