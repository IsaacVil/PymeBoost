"""ORM model for PB_Projects (created when a contract is accepted)."""
from sqlalchemy import Column, DateTime, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class ProjectModel(Base):
    __tablename__ = "PB_Projects"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    contract_version_id = Column("contractVersionId", UUID(as_uuid=False), nullable=False, unique=True)
    project_status_id = Column("projectStatusId", UUID(as_uuid=False), nullable=False)
    completed_at = Column("completedAt", DateTime(timezone=True), nullable=True)
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
