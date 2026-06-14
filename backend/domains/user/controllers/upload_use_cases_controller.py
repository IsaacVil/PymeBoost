from fastapi import APIRouter

router = APIRouter()

@router.post("/api/users/{user_id}/use-cases")
async def upload_use_cases(user_id: str):
    pass
