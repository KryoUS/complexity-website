CREATE TABLE warcraftlogs (
    id TEXT PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    title TEXT,
	owner TEXT,
	start BIGINT,
	zone BIGINT
);