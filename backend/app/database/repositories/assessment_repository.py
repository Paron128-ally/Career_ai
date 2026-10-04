from .base import SupabaseRepository


class AssessmentRepository(SupabaseRepository):
    table_name = "assessments"
