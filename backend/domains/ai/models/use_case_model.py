from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class UseCaseModel(Base):
    __tablename__ = "use_cases"
    id = Column(String, primary_key=True)
    advisor_id = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    processed_at = Column(DateTime, nullable=True)
