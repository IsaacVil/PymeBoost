from sqlalchemy import Column, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class OptimizationAreaModel(Base):
    __tablename__ = "optimization_areas"
    id = Column(String, primary_key=True)
    pyme_id = Column(String, nullable=False)
    area = Column(String, nullable=False)
