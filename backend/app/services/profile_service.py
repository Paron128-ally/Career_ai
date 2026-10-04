from app.core.security import user_payload


class ProfileService:
    def get_profile(self, user, repository=None):
        return {"user": user_payload(user), "profile": None}

    def update_profile(self, user, data, repository=None):
        return {"user": user_payload(user), "profile": data}
