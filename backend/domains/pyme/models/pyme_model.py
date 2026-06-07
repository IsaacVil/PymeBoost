from sqlalchemy import Column, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class PymeModel(Base):
    __tablename__ = "pymes"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    company_name = Column(String, nullable=False)
    industry = Column(String, nullable=True)
