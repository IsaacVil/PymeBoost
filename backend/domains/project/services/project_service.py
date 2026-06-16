"""Dashboard project-tracking read logic (project domain).

Assembles the "Mi Contrato" payload: counterpart, contract terms, roadmap phases
(with subphases as objectives), KPI validations and derived deliverables.
Participant-only access. Returns a DTO.
"""
from sqlalchemy.orm import Session

from backend.domains.project.repositories.tracking_repository import TrackingRepository
from backend.domains.project.schemas.dashboard_response import (
    ContractTermsDTO,
    CounterpartDTO,
    DashboardResponse,
    DeliverableDTO,
    KpiDTO,
    ObjectiveDTO,
    PhaseDTO,
)
from backend.shared.auth.permission_checker import Principal
from backend.shared.exceptions.forbidden_exception import ForbiddenException
from backend.shared.exceptions.not_found_exception import NotFoundException
from backend.shared.logging.logger import get_logger

logger = get_logger(__name__)


def _monogram(name: str) -> str:
    parts = [p for p in name.split() if p]
    return (parts[0][0] + parts[1][0]).upper() if len(parts) >= 2 else name[:2].upper()


class ProjectService:
    def __init__(self, repository: TrackingRepository | None = None) -> None:
        self._repo = repository or TrackingRepository()

    def get_active_tracking(self, db: Session, principal: Principal) -> DashboardResponse:
        """Resolve the principal's active project, then return its tracking."""
        match_id = self._repo.find_active_match_id(db, principal.account_type, principal.subject_id)
        if match_id is None:
            raise NotFoundException("ActiveProject", principal.subject_id)
        return self.get_tracking_by_match(db, match_id, principal)

    def get_tracking_by_match(self, db: Session, match_id: str, principal: Principal) -> DashboardResponse:
        match = self._repo.find_match(db, match_id)
        if match is None:
            raise NotFoundException("Match", match_id)
        is_participant = (
            (principal.account_type == "pyme" and str(match.pyme_id) == principal.subject_id)
            or (principal.account_type == "advisor" and str(match.advisor_id) == principal.subject_id)
        )
        if not is_participant:
            raise ForbiddenException("No sos participante de este proyecto")

        contract = self._repo.find_contract_by_match(db, match_id)
        version = self._repo.find_version(db, str(contract.current_version_id)) if contract and contract.current_version_id else None
        if contract is None or version is None:
            raise NotFoundException("Contract", match_id)

        # Counterpart (the other party).
        if principal.account_type == "pyme":
            adv = self._repo.find_advisor(db, str(match.advisor_id))
            counterpart = CounterpartDTO(
                name=adv.full_name if adv else "Advisor",
                monogram=_monogram(adv.full_name) if adv else "AD",
                role=(adv.description or "Asesor") if adv else "Asesor",
            )
        else:
            pyme = self._repo.find_pyme(db, str(match.pyme_id))
            counterpart = CounterpartDTO(
                name=pyme.company_name if pyme else "PYME",
                monogram=_monogram(pyme.company_name) if pyme else "PY",
                role=(pyme.description or "PYME") if pyme else "PYME",
            )

        # Phases (version-scoped) + subphases as objectives.
        phases: list[PhaseDTO] = []
        active_assigned = False
        for ph in self._repo.find_phases(db, str(version.id)):
            objectives = [ObjectiveDTO(label=s.name, done=bool(s.completed)) for s in self._repo.find_subphases(db, str(ph.id))]
            if ph.completed:
                status = "completed"
            elif not active_assigned:
                status, active_assigned = "active", True
            else:
                status = "pending"
            phases.append(PhaseDTO(name=ph.name, status=status, objectives=objectives))

        # KPIs (project-scoped) + deliverables derived from phases.
        kpis: list[KpiDTO] = []
        project = self._repo.find_project_by_version(db, str(version.id))
        if project is not None:
            for name, before, after, met in self._repo.find_kpis(db, str(project.id)):
                kpis.append(KpiDTO(label=name, before=str(before), after=str(after), positive=bool(met)))
        deliverables = [DeliverableDTO(label=f"Reporte: {p.name}", done=p.status == "completed") for p in phases]

        contract_status = self._repo.status_code(db, "PB_ContractStatus", str(contract.contract_status_id)) or "accepted"
        months = (version.end_date.year - version.start_date.year) * 12 + (version.end_date.month - version.start_date.month)
        terms = ContractTermsDTO(
            status=contract_status,
            budget=float(version.implementation_budget),
            retainer=float(version.monthly_retainer),
            duration_months=max(months, 1),
            commission_pct=float(version.commission_pct),
            advisor_result_pct=float(version.advisor_result_profit or 0),
            start_date=version.start_date.isoformat(),
            end_date=version.end_date.isoformat(),
            objective=version.main_objective,
        )
        logger.info("project.tracking match=%s phases=%d kpis=%d", match_id, len(phases), len(kpis))
        return DashboardResponse(counterpart=counterpart, contract=terms, phases=phases, kpis=kpis, deliverables=deliverables)
