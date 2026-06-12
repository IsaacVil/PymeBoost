from sqlalchemy import Column, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class DocumentBlockModel(Base):
    __tablename__ = "document_blocks"
    id = Column(String, primary_key=True)
    use_case_id = Column(String, nullable=False)
    advisor_id = Column(String, nullable=False)
    content_hash = Column(String, nullable=False)
    thematic_category = Column(String, nullable=True)
    embedding = Column(String, nullable=True)
