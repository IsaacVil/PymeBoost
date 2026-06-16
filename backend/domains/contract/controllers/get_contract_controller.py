"""GET the contract of a match (contract domain — powers the dashboard)."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.domains.contract.schemas.contract_response import ContractResponse
from backend.domains.contract.services.contract_service import ContractService
from backend.shared.auth.permission_checker import Principal, get_current_principal
from backend.shared.database.session import get_db

router = APIRouter(prefix="/api/contracts", tags=["contracts"])
_service = ContractService()


@router.get("/match/{match_id}", response_model=ContractResponse)
def get_contract(
    match_id: str,
    db: Session = Depends(get_db),
    principal: Principal = Depends(get_current_principal),
) -> ContractResponse:
    return _service.get_contract_by_match(db, match_id, principal)
