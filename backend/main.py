"""FastAPI application factory.

Run locally from the repo root:
    uvicorn backend.main:app --reload
"""
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.api.routes import router as api_router
from backend.config import settings
from backend.shared.exceptions.auth_exception import AuthException
from backend.shared.exceptions.domain_exception import DomainException
from backend.shared.exceptions.forbidden_exception import ForbiddenException
from backend.shared.exceptions.not_found_exception import NotFoundException
from backend.shared.exceptions.validation_exception import ValidationException


def _register_exception_handlers(app: FastAPI) -> None:
    """Map domain exceptions to HTTP responses so controllers stay thin."""

    @app.exception_handler(AuthException)
    async def _auth(_: Request, exc: AuthException) -> JSONResponse:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"detail": exc.message})

    @app.exception_handler(ValidationException)
    async def _validation(_: Request, exc: ValidationException) -> JSONResponse:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"detail": exc.message})

    @app.exception_handler(ForbiddenException)
    async def _forbidden(_: Request, exc: ForbiddenException) -> JSONResponse:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content={"detail": exc.message})

    @app.exception_handler(NotFoundException)
    async def _not_found(_: Request, exc: NotFoundException) -> JSONResponse:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"detail": str(exc)})

    @app.exception_handler(DomainException)
    async def _domain(_: Request, exc: DomainException) -> JSONResponse:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"detail": exc.message})


def create_app() -> FastAPI:
    app = FastAPI(title="PymeBoost API", version=settings.API_VERSION)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _register_exception_handlers(app)
    app.include_router(api_router)
    return app


app = create_app()
