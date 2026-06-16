class ForbiddenException(Exception):
    """Authenticated but not allowed to access the resource (maps to HTTP 403)."""

    def __init__(self, message: str):
        super().__init__(message)
        self.message = message
