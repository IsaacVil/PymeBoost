"""Authentication & account-creation business logic.

Local profile (docs/mvpspec.md §2.3): verifies bcrypt passwords against
PB_AuthCredentials and issues local HS256 JWTs instead of delegating to Auth0.
The cédula jurídica is accepted without a real MEIC call (simulated validation).
"""
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from backend.domains.advisor.models.advisor_model import AdvisorModel
from backend.domains.pyme.models.pyme_model import PymeModel
from backend.domains.user.models.auth_credential_model import AuthCredentialModel
from backend.domains.user.repositories.user_repository import UserRepository
from backend.domains.user.schemas.auth_response import AuthResponse
from backend.domains.user.schemas.create_advisor_request import CreateAdvisorRequest
from backend.domains.user.schemas.create_sme_request import CreateSmeRequest
from backend.domains.user.schemas.login_request import LoginRequest
from backend.shared.auth.jwt_validator import JWTValidator
from backend.shared.auth.password_hasher import PasswordHasher
from backend.shared.exceptions.auth_exception import AuthException
from backend.shared.exceptions.validation_exception import ValidationException
from backend.shared.utils.uuid_generator import generate_uuid


class AuthService:
    def __init__(
        self,
        repository: UserRepository | None = None,
        jwt_validator: JWTValidator | None = None,
    ) -> None:
        self._repo = repository or UserRepository()
        self._jwt = jwt_validator or JWTValidator()

    # --- login -------------------------------------------------------------
    def login(self, db: Session, req: LoginRequest) -> AuthResponse:
        credential = self._repo.find_credential_by_email(db, req.email)
        if credential is None or not PasswordHasher.verify(req.password, credential.password_hash):
            raise AuthException("Invalid email or password")
        return self._issue(credential)

    # --- register ----------------------------------------------------------
    def register_pyme(self, db: Session, req: CreateSmeRequest) -> AuthResponse:
        self._ensure_email_free(db, req.business_email)

        company_size_id = self._require(self._repo.company_size_id(db, req.company_size), "company_size")
        status_id = self._require(self._repo.pyme_status_id(db, "pending"), "pyme_status")
        industry_id = self._repo.industry_id(db, req.industry) if req.industry else None
        if req.industry and industry_id is None:
            raise ValidationException(f"Unknown industry code: {req.industry}")
        account_type_id = self._require(self._repo.account_type_id(db, "pyme"), "account_type")

        pyme = PymeModel(
            auth0_id=f"local|{generate_uuid()}",
            owner_name=req.owner_name,
            business_email=req.business_email,
            phone=req.phone,
            cedula_juridica=req.cedula_juridica,
            company_name=req.company_name,
            company_size_id=company_size_id,
            industry_id=industry_id,
            pyme_status_id=status_id,
        )
        credential = AuthCredentialModel(
            account_type_id=account_type_id,
            email=req.business_email,
            password_hash=PasswordHasher.hash(req.password),
        )
        self._persist_account(db, pyme, credential, owner_attr="pyme_id")
        return self._issue(credential)

    def register_advisor(self, db: Session, req: CreateAdvisorRequest) -> AuthResponse:
        self._ensure_email_free(db, req.personal_email)

        status_id = self._require(self._repo.advisor_status_id(db, "pending"), "advisor_status")
        account_type_id = self._require(self._repo.account_type_id(db, "advisor"), "account_type")

        advisor = AdvisorModel(
            auth0_id=f"local|{generate_uuid()}",
            full_name=req.full_name,
            display_name=req.display_name,
            personal_email=req.personal_email,
            phone=req.phone,
            linkedin_url=req.linkedin_url,
            base_rate=req.base_rate,
            advisor_status_id=status_id,
        )
        credential = AuthCredentialModel(
            account_type_id=account_type_id,
            email=req.personal_email,
            password_hash=PasswordHasher.hash(req.password),
        )
        self._persist_account(db, advisor, credential, owner_attr="advisor_id")
        return self._issue(credential)

    # --- helpers -----------------------------------------------------------
    def _persist_account(self, db: Session, profile, credential: AuthCredentialModel, owner_attr: str) -> None:
        try:
            if owner_attr == "pyme_id":
                self._repo.add_pyme(db, profile)
            else:
                self._repo.add_advisor(db, profile)
            setattr(credential, owner_attr, profile.id)
            self._repo.add_credential(db, credential)
            db.commit()
        except IntegrityError as exc:
            db.rollback()
            raise ValidationException("Email, phone or cédula already registered") from exc

    def _ensure_email_free(self, db: Session, email: str) -> None:
        if self._repo.email_taken(db, email):
            raise ValidationException("Email already registered")

    @staticmethod
    def _require(value: str | None, field: str) -> str:
        if value is None:
            raise ValidationException(f"Invalid or unknown {field}")
        return value

    def _issue(self, credential: AuthCredentialModel) -> AuthResponse:
        account_type = "pyme" if credential.pyme_id else "advisor"
        subject_id = credential.pyme_id or credential.advisor_id
        token = self._jwt.create_access_token(
            {"sub": subject_id, "accountType": account_type, "email": credential.email}
        )
        return AuthResponse(
            access_token=token,
            account_type=account_type,
            subject_id=subject_id,
            email=credential.email,
        )
