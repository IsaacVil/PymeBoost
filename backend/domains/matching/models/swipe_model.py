from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class SwipeModel(Base):
    __tablename__ = "swipes"
    id = Column(String, primary_key=True)
    pyme_id = Column(String, nullable=False)
    advisor_id = Column(String, nullable=False)
    approved = Column(Boolean, nullable=False)
