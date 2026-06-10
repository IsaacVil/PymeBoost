from sqlalchemy import Column, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class IndustryModel(Base):
    __tablename__ = "industries"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
