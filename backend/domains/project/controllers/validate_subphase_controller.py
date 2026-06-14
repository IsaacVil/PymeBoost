from fastapi import APIRouter

router = APIRouter()

@router.post("/api/projects/{project_id}/subphases/{subphase_id}/validate")
async def validate_subphase(project_id: str, subphase_id: str):
    pass
