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
from backend.domains.matching.controllers.get_recommendations_controller import (
    router as matching_recommendations_router,
)
from backend.domains.matching.controllers.create_swipe_decision_controller import (
    router as matching_swipe_router,
)
from backend.domains.matching.controllers.unmatch_controller import (
    router as matching_unmatch_router,
)
from backend.domains.communication.controllers.get_messages_controller import (
    router as messages_get_router,
)
from backend.domains.communication.controllers.send_message_controller import (
    router as messages_send_router,
)
from backend.domains.communication.controllers.list_conversations_controller import (
    router as conversations_router,
)
from backend.domains.contract.controllers.get_contract_controller import (
    router as contract_get_router,
)
from backend.domains.contract.controllers.contract_negotiation_controller import (
    router as contract_negotiation_router,
)
from backend.domains.project.controllers.get_dashboard_controller import (
    router as project_dashboard_router,
)

router = APIRouter()
router.include_router(health_router)

# --- User domain (auth & account creation) ---
router.include_router(login_router)
router.include_router(create_sme_router)
router.include_router(create_advisor_router)

# --- Matching domain ---
router.include_router(matching_recommendations_router)
router.include_router(matching_swipe_router)
router.include_router(matching_unmatch_router)

# --- Communication domain ---
router.include_router(conversations_router)
router.include_router(messages_get_router)
router.include_router(messages_send_router)

# --- Contract domain ---
router.include_router(contract_get_router)
router.include_router(contract_negotiation_router)

# --- Project domain (dashboard tracking) ---
router.include_router(project_dashboard_router)

# More domain controllers are mounted here as features land (Fase 2).
