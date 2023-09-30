create table bnetlog(
  id SERIAL PRIMARY KEY,
  created_at timestamptz default now(),
  "status" INT,
  statustext TEXT,
  "method" TEXT,
  baseurl TEXT,
  "url" TEXT,
  "message" TEXT
);

CREATE TRIGGER public_bnetlog_updated
    BEFORE UPDATE 
    ON public.bnetlog
    FOR EACH ROW
    EXECUTE PROCEDURE public.massive_document_updated();