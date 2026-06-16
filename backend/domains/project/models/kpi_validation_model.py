"""ORM models for KPI tracking: PB_ProjectKpiValidations + PB_ContractMetrics."""
from sqlalchemy import Boolean, Column, Numeric, Text, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class KpiValidationModel(Base):
    __tablename__ = "PB_ProjectKpiValidations"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    project_id = Column("projectId", UUID(as_uuid=False), nullable=False)
    contract_metric_id = Column("contractMetricId", UUID(as_uuid=False), nullable=False)
    metrics_before = Column("metricsBefore", Numeric(14, 4), nullable=False)
    metrics_after = Column("metricsAfter", Numeric(14, 4), nullable=False)
    final_improvement_pct = Column("finalImprovementPct", Numeric(7, 4), nullable=False)
    met = Column("met", Boolean, nullable=False)


class ContractMetricModel(Base):
    __tablename__ = "PB_ContractMetrics"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    contract_version_id = Column("contractVersionId", UUID(as_uuid=False), nullable=False)
    name = Column("name", Text, nullable=False)
    target = Column("target", Numeric(14, 4), nullable=False)
    baseline_value = Column("baselineValue", Numeric(14, 4), nullable=True)
