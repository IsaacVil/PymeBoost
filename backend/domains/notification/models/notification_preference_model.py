from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class NotificationPreferenceModel(Base):
    __tablename__ = "notification_preferences"
    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=False)
    email_enabled = Column(Boolean, default=True)
    in_app_enabled = Column(Boolean, default=True)
