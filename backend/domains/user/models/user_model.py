from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class UserModel(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    account_type = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
