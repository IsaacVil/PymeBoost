"""Contract negotiation business logic (contract domain).

Drives the real end-to-end flow agreed for the MVP:

    propose  → either party sends a proposal/counter-offer (version pending_proposal)
    accept   → the COUNTERPART accepts the current version (contract accepted)
    activate → the PYME "Marry the Prospect": creates the project and seals the match

Participant-only access; the proposer cannot accept their own proposal, and only a
PYME may activate. Each step appends a system message to the chat and returns the
contract as a DTO (never a model).
"""
from datetime import date

from sqlalchemy.orm import Session

from backend.domains.contract.models.contract_version_model import ContractVersionModel
from backend.domains.contract.repositories.contract_repository import ContractRepository
from backend.domains.contract.schemas.contract_response import ContractResponse
from backend.domains.contract.schemas.propose_contract_request import ProposeContractRequest
from backend.shared.auth.permission_checker import Principal
from backend.shared.exceptions.domain_exception import DomainException
from backend.shared.exceptions.forbidden_exception import ForbiddenException
from backend.shared.exceptions.not_found_exception import NotFoundException
from backend.shared.exceptions.validation_exception import ValidationException
from backend.shared.logging.logger import get_logger

logger = get_logger(__name__)


class ContractNegotiationService:
    def __init__(self, repository: ContractRepository | None = None) -> None:
        self._repo = repository or ContractRepository()

    # --- propose -----------------------------------------------------------
    def propose(self, db: Session, match_id: str, req: ProposeContractRequest, principal: Principal) -> ContractResponse:
        match = self._participant_match(db, match_id, principal)

        try:
            start = date.fromisoformat(req.start_date)
            end = date.fromisoformat(req.end_date)
        except ValueError as exc:
            raise ValidationException("Fechas inválidas (usar formato YYYY-MM-DD)") from exc
        if end <= start:
            raise ValidationException("La fecha de fin debe ser posterior a la de inicio")

        negotiating_id = self._require(self._repo.contract_status_id(db, "negotiating"), "contract_status")
        contract = self._repo.find_by_match(db, match_id)
        if contract is None:
            contract = self._repo.create_contract(db, match_id, negotiating_id)

        # Supersede the prior current version (if any) before adding the new one.
        if contract.current_version_id:
            superseded_id = self._require(self._repo.version_status_id(db, "superseded"), "version_status")
            self._repo.set_version_status(db, str(contract.current_version_id), superseded_id)

        pending_id = self._require(self._repo.version_status_id(db, "pending_proposal"), "version_status")
        account_type_id = self._require(self._repo.account_type_id(db, principal.account_type), "account_type")
        is_pyme = principal.account_type == "pyme"
        version = ContractVersionModel(
            contract_id=str(contract.id),
            version_number=self._repo.next_version_number(db, str(contract.id)),
            proposed_by_account_type_id=account_type_id,
            proposed_by_pyme_id=principal.subject_id if is_pyme else None,
            proposed_by_advisor_id=principal.subject_id if not is_pyme else None,
            contract_version_status_id=pending_id,
            implementation_budget=req.budget,
            monthly_retainer=req.retainer,
            start_date=start,
            end_date=end,
            commission_pct=req.commission_pct,
            advisor_result_profit=req.advisor_result_pct,
            main_objective=req.objective,
        )
        self._repo.add_version(db, version)
        self._repo.update_contract(db, str(contract.id), negotiating_id, str(version.id))
        self._repo.add_system_message(db, match_id, "📄 Propuesta de contrato enviada.")
        db.commit()

        logger.info("contract.propose match=%s by=%s v=%s", match_id, principal.account_type, version.version_number)
        return self._to_dto(db, str(contract.id), match_id, version)

    # --- accept ------------------------------------------------------------
    def accept(self, db: Session, match_id: str, principal: Principal) -> ContractResponse:
        self._participant_match(db, match_id, principal)
        contract, version = self._load_current(db, match_id)

        proposer_type = "pyme" if version.proposed_by_pyme_id else "advisor"
        if proposer_type == principal.account_type:
            raise DomainException("No podés aceptar tu propia propuesta; espera la respuesta de la contraparte.")

        accepted_v = self._require(self._repo.version_status_id(db, "accepted"), "version_status")
        accepted_c = self._require(self._repo.contract_status_id(db, "accepted"), "contract_status")
        self._repo.set_version_status(db, str(version.id), accepted_v)
        self._repo.update_contract(db, str(contract.id), accepted_c, None)
        self._repo.add_system_message(db, match_id, "✓ Propuesta de contrato aceptada.")
        db.commit()

        logger.info("contract.accept match=%s by=%s", match_id, principal.account_type)
        return self._to_dto(db, str(contract.id), match_id, version)

    # --- reject ------------------------------------------------------------
    def reject(self, db: Session, match_id: str, principal: Principal) -> ContractResponse:
        self._participant_match(db, match_id, principal)
        contract, version = self._load_current(db, match_id)

        proposer_type = "pyme" if version.proposed_by_pyme_id else "advisor"
        if proposer_type == principal.account_type:
            raise DomainException("No podés rechazar tu propia propuesta.")

        rejected_v = self._require(self._repo.version_status_id(db, "rejected"), "version_status")
        rejected_c = self._require(self._repo.contract_status_id(db, "rejected"), "contract_status")
        self._repo.set_version_status(db, str(version.id), rejected_v)
        self._repo.update_contract(db, str(contract.id), rejected_c, None)
        self._repo.add_system_message(db, match_id, "✕ Propuesta de contrato rechazada.")
        db.commit()

        logger.info("contract.reject match=%s by=%s", match_id, principal.account_type)
        return self._to_dto(db, str(contract.id), match_id, version)

    # --- activate (marry) --------------------------------------------------
    def activate(self, db: Session, match_id: str, principal: Principal) -> ContractResponse:
        if principal.account_type != "pyme":
            raise ForbiddenException("Solo la PYME puede formalizar el contrato (Marry the Prospect).")
        self._participant_match(db, match_id, principal)
        contract, version = self._load_current(db, match_id)

        status_code = self._repo.status_code_by_id(db, str(contract.contract_status_id))
        if status_code != "accepted":
            raise DomainException("El advisor aún no aceptó la propuesta; no se puede activar el contrato.")

        if self._repo.find_project_by_version(db, str(version.id)) is None:
            active_status = self._require(self._repo.project_status_id(db, "active"), "project_status")
            project_id = self._repo.create_project(db, str(version.id), active_status)
            self._repo.seed_project_roadmap(db, str(version.id), project_id, version.main_objective)

        finalized = self._require(self._repo.match_status_id(db, "finalized"), "match_status")
        self._repo.update_match_status(db, match_id, finalized)
        self._repo.add_system_message(db, match_id, "💍 Contrato activo. Pueden seguir el proyecto en el dashboard.")
        db.commit()

        logger.info("contract.activate match=%s", match_id)
        return self._to_dto(db, str(contract.id), match_id, version)

    # --- helpers -----------------------------------------------------------
    def _participant_match(self, db: Session, match_id: str, principal: Principal):
        match = self._repo.find_match(db, match_id)
        if match is None:
            raise NotFoundException("Match", match_id)
        is_participant = (
            (principal.account_type == "pyme" and str(match.pyme_id) == principal.subject_id)
            or (principal.account_type == "advisor" and str(match.advisor_id) == principal.subject_id)
        )
        if not is_participant:
            raise ForbiddenException("No sos participante de este contrato")
        return match

    def _load_current(self, db: Session, match_id: str):
        contract = self._repo.find_by_match(db, match_id)
        if contract is None or not contract.current_version_id:
            raise NotFoundException("Contract", match_id)
        version = self._repo.find_version(db, str(contract.current_version_id))
        if version is None:
            raise NotFoundException("ContractVersion", str(contract.id))
        return contract, version

    @staticmethod
    def _require(value: str | None, field: str) -> str:
        if value is None:
            raise ValidationException(f"Catálogo incompleto: {field}")
        return value

    def _to_dto(self, db: Session, contract_id: str, match_id: str, version: ContractVersionModel) -> ContractResponse:
        contract = self._repo.find_by_match(db, match_id)
        status = self._repo.status_code_by_id(db, str(contract.contract_status_id)) if contract else "negotiating"
        return ContractResponse(
            id=contract_id,
            match_id=match_id,
            status=status or "negotiating",
            proposed_by="pyme" if version.proposed_by_pyme_id else "advisor",
            budget=float(version.implementation_budget),
            retainer=float(version.monthly_retainer),
            commission_pct=float(version.commission_pct),
            advisor_result_pct=float(version.advisor_result_profit or 0),
            start_date=version.start_date.isoformat() if version.start_date else "",
            end_date=version.end_date.isoformat() if version.end_date else "",
            objective=version.main_objective,
        )
