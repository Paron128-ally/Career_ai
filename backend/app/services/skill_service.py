class SkillService:
    def list_skills(self, user, repository=None):
        return []

    def add_skill(self, user, skill, repository=None):
        return {"status": "queued", "skill": skill}
