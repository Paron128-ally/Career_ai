from .base import SupabaseRepository


class RecommendationRepository(SupabaseRepository):
    table_name = "recommendations"
