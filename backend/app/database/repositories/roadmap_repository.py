from .base import SupabaseRepository


class RoadmapRepository(SupabaseRepository):
    table_name = "roadmap_steps"
