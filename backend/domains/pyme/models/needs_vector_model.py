from sqlalchemy import Column, String
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class NeedsVectorModel(Base):
    __tablename__ = "needs_vectors"
    id = Column(String, primary_key=True)
    pyme_id = Column(String, nullable=False)
