"""Root API router.

Aggregates infrastructure routers and, as features land in Fase 2, each domain's
controllers. Keeping a single root router is what lets ``main.create_app`` mount
the whole API with one ``include_router`` call.
"""
from fastapi import APIRouter

from backend.api.health import router as health_router
from backend.domains.user.controllers.create_advisor_account_controller import (
    router as create_advisor_router,
)
from backend.domains.user.controllers.create_sme_account_controller import (
    router as create_sme_router,
)
from backend.domains.user.controllers.login_controller import router as login_router

router = APIRouter()
router.include_router(health_router)

# --- User domain (auth & account creation) ---
router.include_router(login_router)
router.include_router(create_sme_router)
router.include_router(create_advisor_router)

# More domain controllers are mounted here as features land (Fase 2).
