"""ORM model for PB_ContractSubPhases (work units within a roadmap phase)."""
from sqlalchemy import Boolean, Column, Text, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class SubphaseModel(Base):
    __tablename__ = "PB_ContractSubPhases"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    phase_id = Column("phaseId", UUID(as_uuid=False), nullable=False)
    name = Column("name", Text, nullable=False)
    completed = Column("completed", Boolean, nullable=False, server_default=text("false"))
