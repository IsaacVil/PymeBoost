from sqlalchemy import Column, String, Float
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class ProjectHealthModel(Base):
    __tablename__ = "project_health"
    id = Column(String, primary_key=True)
    project_id = Column(String, nullable=False)
    health_score = Column(Float, nullable=False)
