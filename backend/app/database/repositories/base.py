class SupabaseRepository:
    table_name = ""

    def __init__(self, supabase):
        self.supabase = supabase

    def table(self):
        if not self.table_name:
            raise ValueError("Repository table_name is not configured")
        return self.supabase.table(self.table_name)
