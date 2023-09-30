create table warcraftlogsdetail(
  id text primary key,
  body jsonb not null,
  search tsvector,
  created_at timestamptz default now()
);
create index idx_warcraftlogsdetail on warcraftlogsdetail using GIN(body jsonb_path_ops);
create index idx_warcraftlogsdetail_search on warcraftlogsdetail using GIN(search);