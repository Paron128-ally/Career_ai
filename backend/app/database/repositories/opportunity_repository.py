from .base import SupabaseRepository


class OpportunityRepository(SupabaseRepository):
    table_name = "opportunities"
