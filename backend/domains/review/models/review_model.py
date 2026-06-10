from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class ReviewModel(Base):
    __tablename__ = "reviews"
    id = Column(String, primary_key=True)
    reviewer_id = Column(String, nullable=False)
    subject_id = Column(String, nullable=False)
    rating = Column(Float, nullable=False)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, nullable=False)
