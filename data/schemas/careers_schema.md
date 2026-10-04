# careers.csv — Schema

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `career_id` | INTEGER | PRIMARY KEY | Auto-incrementing ID |
| `career_name` | TEXT | NOT NULL, UNIQUE | e.g. "Data Scientist" |
| `category` | TEXT | NOT NULL | e.g. "Technology", "Finance" |
| `description` | TEXT | | Short career description |

## Sample record

```csv
career_id,career_name,category,description
1,Data Scientist,Technology,"Analyse large datasets to derive business insights using ML and statistics."
2,Software Engineer,Technology,"Design, develop and maintain software systems."
```
