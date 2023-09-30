create table wowheadlog(
  id SERIAL PRIMARY KEY,
  created_at timestamptz default now(),
  "status" INT,
  statustext TEXT,
  "method" TEXT,
  baseurl TEXT,
  "url" TEXT,
  "message" TEXT
);