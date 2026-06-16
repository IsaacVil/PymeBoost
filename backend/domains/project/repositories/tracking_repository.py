"""Read access for dashboard project tracking (project domain).

Repository pattern, ORM. Reads several domains (matching/contract/advisor/pyme) to
assemble the dashboard — an accepted MVP cross-domain deviation (README Agent
Validations); status codes via text() (accepted catalog-lookup pattern).
"""
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from backend.domains.advisor.models.advisor_model import AdvisorModel
from backend.domains.contract.models.contract_model import ContractModel
from backend.domains.contract.models.contract_version_model import ContractVersionModel
from backend.domains.matching.models.match_model import MatchModel
from backend.domains.project.models.kpi_validation_model import ContractMetricModel, KpiValidationModel
from backend.domains.project.models.project_model import ProjectModel
from backend.domains.project.models.roadmap_phase_model import RoadmapPhaseModel
from backend.domains.project.models.subphase_model import SubphaseModel
from backend.domains.pyme.models.pyme_model import PymeModel


class TrackingRepository:
    def find_match(self, db: Session, match_id: str) -> MatchModel | None:
        return db.execute(select(MatchModel).where(MatchModel.id == match_id)).scalar_one_or_none()

    def find_active_match_id(self, db: Session, account_type: str, subject_id: str) -> str | None:
        """The match of the principal that has an accepted contract with a project."""
        owner = MatchModel.pyme_id if account_type == "pyme" else MatchModel.advisor_id
        stmt = (
            select(MatchModel.id)
            .join(ContractModel, ContractModel.match_id == MatchModel.id)
            .join(ProjectModel, ProjectModel.contract_version_id == ContractModel.current_version_id)
            .where(owner == subject_id)
            .limit(1)
        )
        row = db.execute(stmt).scalar_one_or_none()
        return str(row) if row is not None else None

    def find_contract_by_match(self, db: Session, match_id: str) -> ContractModel | None:
        return db.execute(select(ContractModel).where(ContractModel.match_id == match_id)).scalar_one_or_none()

    def find_version(self, db: Session, version_id: str) -> ContractVersionModel | None:
        return db.execute(select(ContractVersionModel).where(ContractVersionModel.id == version_id)).scalar_one_or_none()

    def find_advisor(self, db: Session, advisor_id: str) -> AdvisorModel | None:
        return db.execute(select(AdvisorModel).where(AdvisorModel.id == advisor_id)).scalar_one_or_none()

    def find_pyme(self, db: Session, pyme_id: str) -> PymeModel | None:
        return db.execute(select(PymeModel).where(PymeModel.id == pyme_id)).scalar_one_or_none()

    def find_phases(self, db: Session, version_id: str) -> list[RoadmapPhaseModel]:
        stmt = select(RoadmapPhaseModel).where(RoadmapPhaseModel.contract_version_id == version_id).order_by(RoadmapPhaseModel.phase_order)
        return list(db.execute(stmt).scalars().all())

    def find_subphases(self, db: Session, phase_id: str) -> list[SubphaseModel]:
        return list(db.execute(select(SubphaseModel).where(SubphaseModel.phase_id == phase_id)).scalars().all())

    def find_project_by_version(self, db: Session, version_id: str) -> ProjectModel | None:
        return db.execute(select(ProjectModel).where(ProjectModel.contract_version_id == version_id)).scalar_one_or_none()

    def find_kpis(self, db: Session, project_id: str) -> list[tuple]:
        stmt = (
            select(ContractMetricModel.name, KpiValidationModel.metrics_before, KpiValidationModel.metrics_after, KpiValidationModel.met)
            .join(ContractMetricModel, ContractMetricModel.id == KpiValidationModel.contract_metric_id)
            .where(KpiValidationModel.project_id == project_id)
        )
        return list(db.execute(stmt).all())

    def status_code(self, db: Session, table: str, status_id: str) -> str | None:
        row = db.execute(text(f'SELECT "code" FROM "{table}" WHERE "id" = :id'), {"id": status_id}).scalar_one_or_none()
        return str(row) if row is not None else None
