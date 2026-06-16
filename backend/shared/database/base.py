"""Canonical SQLAlchemy declarative base for all domain models.

Every persistence model under ``backend/domains/*/models/`` MUST import ``Base``
from here instead of declaring its own, so that every table registers against a
single ``MetaData``. A shared registry is what makes ``create_all``, reflection,
and migrations see the full schema; per-model bases fragment it.

See docs/mvpspec.md (WS-1): existing model stubs are migrated to this Base as
each feature is filled in during Fase 2.
"""
from sqlalchemy import MetaData
from sqlalchemy.orm import DeclarativeBase

# Deterministic constraint/index names (mirrors the hand-written SQL conventions
# in database/scripts/creationScript.sql).
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}


class Base(DeclarativeBase):
    """Shared declarative base. Import this in every model module."""

    metadata = MetaData(naming_convention=NAMING_CONVENTION)
