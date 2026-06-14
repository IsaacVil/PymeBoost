from sqlalchemy import Column, String, Text
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class QuestionCatalogModel(Base):
    __tablename__ = "question_catalog"
    id = Column(String, primary_key=True)
    text = Column(Text, nullable=False)
    category = Column(String, nullable=False)
