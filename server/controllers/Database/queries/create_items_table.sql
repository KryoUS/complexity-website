CREATE TABLE icons (
    id INT PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    epoch_datetime BIGINT,
    iconURL TEXT
);