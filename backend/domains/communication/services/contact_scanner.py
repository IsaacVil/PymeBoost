"""ContactScanner — Strategy that blocks off-platform contact sharing in chat.

PymeBoost keeps all communication on-platform (README §1.8 / Message Security):
emails, phone numbers, social handles and external links are blocked. Mirrors the
frontend scan so the rule is enforced server-side too.
"""
import re

_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}", re.I), "un correo electrónico"),
    (re.compile(r"(?:\+?\d[\s-]?){8,}"), "un número telefónico"),
    (re.compile(r"(?:wa\.me|whats\s?app|telegram|t\.me|instagram|insta\b|facebook|tiktok|@[a-z0-9_.]{3,})", re.I), "una red social o contacto externo"),
    (re.compile(r"https?://|www\.", re.I), "un enlace externo"),
]


class ContactScanner:
    @staticmethod
    def scan(text: str) -> str | None:
        """Return the blocked-content reason, or None if the text is clean."""
        for pattern, reason in _PATTERNS:
            if pattern.search(text):
                return reason
        return None
