# Informações adicionais

query sql para buscar a métrica de melhor sequencia de refeições dentro da dieta:

```sql

WITH ranked_data AS (
  SELECT *,
         ROW_NUMBER() OVER (ORDER BY date_time) AS row_num
  FROM meals
  WHERE created_by = ${userId}
),
grouped_data AS (
  SELECT *,
         ROW_NUMBER() OVER (ORDER BY row_num) - ROW_NUMBER() OVER (PARTITION BY is_in_diet ORDER BY row_num) AS group_id
  FROM ranked_data
),
filtered_groups AS (
  SELECT group_id,
         SUM(CASE WHEN is_in_diet THEN 1 ELSE 0 END) AS group_count
  FROM grouped_data
  GROUP BY group_id
  HAVING SUM(CASE WHEN is_in_diet = FALSE THEN 1 ELSE 0 END) = 0
)
SELECT MAX(group_count) AS max_group_count
FROM filtered_groups;


```
