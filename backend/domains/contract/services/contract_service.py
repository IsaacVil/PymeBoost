"""Contract read business logic (powers the dashboard "Mi Contrato").

Participant-only access; returns the contract's current-version terms as a DTO.
"""
from sqlalchemy.orm import Session

from backend.domains.contract.repositories.contract_repository import ContractRepository
from backend.domains.contract.schemas.contract_response import ContractResponse
from backend.shared.auth.permission_checker import Principal
from backend.shared.exceptions.forbidden_exception import ForbiddenException
from backend.shared.exceptions.not_found_exception import NotFoundException
from backend.shared.logging.logger import get_logger

logger = get_logger(__name__)


class ContractService:
    def __init__(self, repository: ContractRepository | None = None) -> None:
        self._repo = repository or ContractRepository()

    def get_contract_by_match(self, db: Session, match_id: str, principal: Principal) -> ContractResponse:
        match = self._repo.find_match(db, match_id)
        if match is None:
            raise NotFoundException("Match", match_id)
        is_participant = (
            (principal.account_type == "pyme" and str(match.pyme_id) == principal.subject_id)
            or (principal.account_type == "advisor" and str(match.advisor_id) == principal.subject_id)
        )
        if not is_participant:
            raise ForbiddenException("No sos participante de este contrato")

        contract = self._repo.find_by_match(db, match_id)
        if contract is None:
            raise NotFoundException("Contract", match_id)
        version = self._repo.find_version(db, str(contract.current_version_id)) if contract.current_version_id else None
        if version is None:
            raise NotFoundException("ContractVersion", str(contract.id))

        status = self._repo.status_code_by_id(db, str(contract.contract_status_id)) or "negotiating"
        logger.info("contract.read match=%s status=%s", match_id, status)
        return ContractResponse(
            id=str(contract.id),
            match_id=match_id,
            status=status,
            budget=float(version.implementation_budget),
            retainer=float(version.monthly_retainer),
            commission_pct=float(version.commission_pct),
            advisor_result_pct=float(version.advisor_result_profit or 0),
            start_date=version.start_date.isoformat() if version.start_date else "",
            end_date=version.end_date.isoformat() if version.end_date else "",
            objective=version.main_objective,
        )
