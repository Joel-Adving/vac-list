-- migrations/profiles_table.sql
CREATE TABLE IF NOT EXISTS suspects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    steam_id TEXT,
    suspect_type TEXT,
    added_by JSON,
    created JSON
);