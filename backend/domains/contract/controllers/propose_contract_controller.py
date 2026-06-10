from fastapi import APIRouter
router = APIRouter()

@router.post("/api/contracts")
async def propose_contract():
    pass
