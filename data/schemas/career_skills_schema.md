# career_skills.csv — Schema

Maps which skills are required for which careers, and at what proficiency level.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `career_id` | INTEGER | FK → careers | Career this mapping belongs to |
| `skill_id` | INTEGER | FK → skills | Required skill |
| `required_level` | INTEGER | 0–100 | Minimum proficiency required |
| `importance` | TEXT | | "essential" / "preferred" / "bonus" |

## Sample record

```csv
career_id,skill_id,required_level,importance
1,1,80,essential
1,2,85,essential
1,3,75,essential
2,1,70,essential
2,2,50,preferred
```
