from fastapi import APIRouter
router = APIRouter()

@router.post("/api/contracts/{contract_id}/counter-offer")
async def counter_offer(contract_id: str):
    pass
