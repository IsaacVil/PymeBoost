"""ORM model for PB_ContractRoadmapPhases (project roadmap, per contract version)."""
from sqlalchemy import Boolean, Column, SmallInteger, Text, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class RoadmapPhaseModel(Base):
    __tablename__ = "PB_ContractRoadmapPhases"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    contract_version_id = Column("contractVersionId", UUID(as_uuid=False), nullable=False)
    phase_order = Column("phaseOrder", SmallInteger, nullable=False)
    name = Column("name", Text, nullable=False)
    description = Column("description", Text, nullable=True)
    completed = Column("completed", Boolean, nullable=False, server_default=text("false"))
