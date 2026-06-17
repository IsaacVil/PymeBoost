"""Contract negotiation endpoints (contract domain): propose, accept, activate.

Real end-to-end flow: a party proposes (or counter-offers), the counterpart
accepts, and the PYME activates ("Marry the Prospect") to create the project.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.domains.contract.schemas.contract_response import ContractResponse
from backend.domains.contract.schemas.propose_contract_request import ProposeContractRequest
from backend.domains.contract.services.contract_negotiation_service import ContractNegotiationService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/contracts", tags=["contracts"])
_service = ContractNegotiationService()


@router.post("/match/{match_id}/propose", response_model=ContractResponse)
def propose_contract(
    match_id: str,
    req: ProposeContractRequest,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> ContractResponse:
    return _service.propose(db, match_id, req, principal)


@router.post("/match/{match_id}/accept", response_model=ContractResponse)
def accept_contract(
    match_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> ContractResponse:
    return _service.accept(db, match_id, principal)


@router.post("/match/{match_id}/reject", response_model=ContractResponse)
def reject_contract(
    match_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> ContractResponse:
    return _service.reject(db, match_id, principal)


@router.post("/match/{match_id}/activate", response_model=ContractResponse)
def activate_contract(
    match_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> ContractResponse:
    return _service.activate(db, match_id, principal)
