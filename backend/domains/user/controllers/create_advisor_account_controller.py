from fastapi import APIRouter

router = APIRouter()

@router.post("/api/advisor/accounts")
async def create_advisor_account():
    pass
