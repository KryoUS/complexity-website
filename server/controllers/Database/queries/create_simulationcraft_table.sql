create table simulationcraft(
  id serial primary key,
  publicrealm jsonb not null,
  currenttier jsonb not null,
  search tsvector,
  created_at timestamptz default now()
);
create index idx_simulationcraft_publicrealm on simulationcraft using GIN(publicrealm jsonb_path_ops);
create index idx_simulationcraft_currenttier on simulationcraft using GIN(currenttier jsonb_path_ops);
create index idx_simulationcraft_search on simulationcraft using GIN(search);