class SessionCacheService:
    def get_or_create_session(self, user_id: str): pass
    def invalidate_session(self, user_id: str): pass
    def refresh_session_ttl(self, user_id: str): pass
