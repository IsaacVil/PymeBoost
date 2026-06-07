from fastapi import APIRouter

router = APIRouter()

@router.post("/api/sme/accounts")
async def create_sme_account():
    pass
