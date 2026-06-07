from sqlalchemy import Column, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class SpecializationModel(Base):
    __tablename__ = "specializations"
    id = Column(String, primary_key=True)
    advisor_id = Column(String, nullable=False)
    industry = Column(String, nullable=False)
