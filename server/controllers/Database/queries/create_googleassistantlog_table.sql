CREATE TABLE GoogleAssistantLog (
	id SERIAL PRIMARY KEY,
	created_at timestamptz NOT NULL DEFAULT now(),
	epoch_datetime BIGINT,
	intent TEXT,
    queryText TEXT,
	error jsonb NOT NULL DEFAULT '{}'
)