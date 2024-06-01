-- migrations/profiles_table.sql
CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    steam_id TEXT,
    suspect_type TEXT,
    persona_name TEXT,
    profile_state INTEGER,
    profile_url TEXT,
    avatar TEXT,
    avatar_medium TEXT,
    avatar_full TEXT,
    avatar_hash TEXT,
    persona_state INTEGER,
    primary_clan_id TEXT,
    persona_state_flags INTEGER,
    community_banned BOOLEAN,
    vac_banned BOOLEAN,
    number_of_vac_bans INTEGER,
    days_since_last_ban INTEGER,
    number_of_game_bans INTEGER,
    economy_ban TEXT,
    player_stats JSON,
    community_visibility_state INTEGER,
    added_by JSON,
    time_created INTEGER,
    created JSON
);