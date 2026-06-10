from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class NotificationModel(Base):
    __tablename__ = "notifications"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    message = Column(String, nullable=False)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime, nullable=False)
