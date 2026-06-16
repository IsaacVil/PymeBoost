"""Password hashing/verification (bcrypt).

Local-profile equivalent of Auth0's credential handling (see docs/mvpspec.md
§2.3). Uses bcrypt directly so it transparently verifies the ``$2a$`` hashes
produced by Postgres' pgcrypto in seed_dev.sql, and hashes new passwords on
register.
"""
import bcrypt

# bcrypt truncates silently past 72 bytes; we reject longer inputs explicitly.
_MAX_BYTES = 72


class PasswordHasher:
    @staticmethod
    def hash(password: str) -> str:
        pwd = password.encode("utf-8")
        if len(pwd) > _MAX_BYTES:
            raise ValueError("Password must be at most 72 bytes")
        return bcrypt.hashpw(pwd, bcrypt.gensalt()).decode("utf-8")

    @staticmethod
    def verify(password: str, hashed: str) -> bool:
        try:
            return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
        except (ValueError, TypeError):
            return False
