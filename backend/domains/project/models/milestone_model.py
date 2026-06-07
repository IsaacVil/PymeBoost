from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class MilestoneModel(Base):
    __tablename__ = "milestones"
    id = Column(String, primary_key=True)
    project_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
    due_date = Column(DateTime, nullable=True)
