"""ORM model for PB_Contracts (negotiation thread per match)."""
from sqlalchemy import Column, DateTime, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class ContractModel(Base):
    __tablename__ = "PB_Contracts"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    match_id = Column("matchId", UUID(as_uuid=False), nullable=False, unique=True)
    contract_status_id = Column("contractStatusId", UUID(as_uuid=False), nullable=False)
    current_version_id = Column("currentVersionId", UUID(as_uuid=False), nullable=True)
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
    updated_at = Column("updatedAt", DateTime(timezone=True), server_default=text("now()"))
