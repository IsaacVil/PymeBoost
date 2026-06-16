"""ORM model for PB_ContractVersions (each proposal / counter-offer)."""
from sqlalchemy import Column, Date, DateTime, Integer, Numeric, Text, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class ContractVersionModel(Base):
    __tablename__ = "PB_ContractVersions"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    contract_id = Column("contractId", UUID(as_uuid=False), nullable=False)
    version_number = Column("versionNumber", Integer, nullable=False)
    implementation_budget = Column("implementationBudget", Numeric(14, 2), nullable=False)
    monthly_retainer = Column("monthlyRetainer", Numeric(14, 2), nullable=False)
    start_date = Column("startDate", Date, nullable=False)
    end_date = Column("endDate", Date, nullable=False)
    commission_pct = Column("commissionPct", Numeric(7, 4), nullable=False)
    advisor_result_profit = Column("advisorResultProfit", Numeric(14, 2), nullable=True)
    main_objective = Column("mainObjective", Text, nullable=False)
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
