"""ORM model for PB_AuthCredentials (local-profile auth storage).

Maps the credentials table added in database/scripts/auth_local.sql. Stores the
bcrypt hash; the account type is derived from which owner FK is set
(``pyme_id`` -> PYME, ``advisor_id`` -> Advisor).
"""
from sqlalchemy import Column, DateTime, String, text
from sqlalchemy.dialects.postgresql import UUID

from backend.shared.database.base import Base


class AuthCredentialModel(Base):
    __tablename__ = "PB_AuthCredentials"

    id = Column("id", UUID(as_uuid=False), primary_key=True, server_default=text("gen_random_uuid()"))
    account_type_id = Column("accountTypeId", UUID(as_uuid=False), nullable=False)
    pyme_id = Column("pymeId", UUID(as_uuid=False), nullable=True)
    advisor_id = Column("advisorId", UUID(as_uuid=False), nullable=True)
    email = Column("email", String(150), nullable=False, unique=True)
    password_hash = Column("passwordHash", String(72), nullable=False)
    created_at = Column("createdAt", DateTime(timezone=True), server_default=text("now()"))
    updated_at = Column("updatedAt", DateTime(timezone=True), server_default=text("now()"))
