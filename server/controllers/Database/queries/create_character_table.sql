create table characters(
  id INT PRIMARY KEY,
  is_valid BOOLEAN,
  summary JSONB,
  achievements JSONB,
  achievement_statistics JSONB,
  character_statistics JSONB,
  collections_mounts JSONB,
  collections_pets JSONB,
  encounters_dungeons JSONB,
  encounters_raids JSONB,
  equipment JSONB,
  hunter_pets JSONB,
  media JSONB,
  mythic_keystone_profile JSONB,
  professions JSONB,
  pvp_summary JSONB,
  pvp_2v2 JSONB,
  pvp_3v3 JSONB,
  pvp_rbg JSONB,
  quests_completed JSONB,
  reputations JSONB,
  soulbinds JSONB,
  specializations JSONB,
  titles JSONB,
  created_at timestamptz default now(),
  updated_at timestamptz
);

CREATE TRIGGER public_characters_updated
    BEFORE UPDATE 
    ON public.characters
    FOR EACH ROW
    EXECUTE PROCEDURE public.massive_document_updated();