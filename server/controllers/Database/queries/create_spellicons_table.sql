CREATE TABLE spellicons (
    id INT PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    unix_datetime BIGINT,
    name TEXT,
    iconurl TEXT,
    description TEXT,
    casttime TEXT
);