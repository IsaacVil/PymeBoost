from sqlalchemy import Column, String, Float
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class AdvisorModel(Base):
    __tablename__ = "advisors"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    base_rate = Column(Float, nullable=True)
