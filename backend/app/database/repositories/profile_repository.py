from .base import SupabaseRepository


class ProfileRepository(SupabaseRepository):
    table_name = "profiles"
