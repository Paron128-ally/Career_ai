from .base import SupabaseRepository


class StudentRepository(SupabaseRepository):
    table_name = "students"
