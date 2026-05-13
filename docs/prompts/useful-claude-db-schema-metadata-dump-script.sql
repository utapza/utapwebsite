-- ============================================================
-- uTap Schema Extractor
-- Run this in the Supabase SQL Editor (online)
-- Copy the full output and paste it back to Claude
-- ============================================================

SELECT
  t.table_name,
  c.column_name,
  c.data_type,
  c.is_nullable,
  c.column_default,
  CASE
    WHEN pk.column_name IS NOT NULL THEN 'PRIMARY KEY'
    WHEN fk.column_name IS NOT NULL THEN 'FK → ' || fk.foreign_table_name || '.' || fk.foreign_column_name
    ELSE ''
  END AS key_info
FROM
  information_schema.tables t
  JOIN information_schema.columns c
    ON t.table_name = c.table_name
    AND t.table_schema = c.table_schema

  -- Primary key info
  LEFT JOIN (
    SELECT
      kcu.table_name,
      kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.constraint_type = 'PRIMARY KEY'
  ) pk ON pk.table_name = t.table_name AND pk.column_name = c.column_name

  -- Foreign key info
  LEFT JOIN (
    SELECT
      kcu.table_name,
      kcu.column_name,
      ccu.table_name AS foreign_table_name,
      ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name
      AND tc.table_schema = ccu.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY'
  ) fk ON fk.table_name = t.table_name AND fk.column_name = c.column_name

WHERE
  t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'

ORDER BY
  t.table_name,
  c.ordinal_position;