# skills.csv — Schema

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `skill_id` | INTEGER | PRIMARY KEY | Auto-incrementing ID |
| `skill_name` | TEXT | NOT NULL, UNIQUE | e.g. "Python", "SQL" |
| `category` | TEXT | NOT NULL | e.g. "Programming", "Data Analysis" |

## Sample record

```csv
skill_id,skill_name,category
1,Python,Programming
2,SQL,Data Analysis
3,Machine Learning,AI/ML
4,Communication,Soft Skills
```
