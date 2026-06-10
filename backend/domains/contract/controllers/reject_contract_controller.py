from fastapi import APIRouter
router = APIRouter()

@router.post("/api/contracts/{contract_id}/reject")
async def reject_contract(contract_id: str):
    pass
