from fastapi import APIRouter
router = APIRouter()

@router.post("/api/contracts/{contract_id}/accept")
async def accept_contract(contract_id: str):
    pass
