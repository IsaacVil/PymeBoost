from fastapi import APIRouter

router = APIRouter()

@router.post("/api/auth/login")
async def login():
    pass
