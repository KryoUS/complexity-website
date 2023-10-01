const getCharData = require('./getCharData');

module.exports = (db, id, characterName, realmSlug) => {
    getCharData(db, id, characterName, realmSlug, '', 'summary');
    getCharData(db, id, characterName, realmSlug, '/achievements', 'achievements');
    getCharData(db, id, characterName, realmSlug, '/achievements/statistics', 'achievement_statistics');
    getCharData(db, id, characterName, realmSlug, '/collections/mounts', 'collections_mounts');
    getCharData(db, id, characterName, realmSlug, '/collections/pets', 'collections_pets');
    getCharData(db, id, characterName, realmSlug, '/encounters/dungeons', 'encounters_dungeons');
    getCharData(db, id, characterName, realmSlug, '/encounters/raids', 'encounters_raids');
    getCharData(db, id, characterName, realmSlug, '/equipment', 'equipment');
    getCharData(db, id, characterName, realmSlug, '/hunter-pets', 'hunter_pets');
    getCharData(db, id, characterName, realmSlug, '/character-media', 'media');
    getCharData(db, id, characterName, realmSlug, '/mythic-keystone-profile', 'mythic_keystone_profile');
    getCharData(db, id, characterName, realmSlug, '/professions', 'professions');
    getCharData(db, id, characterName, realmSlug, '/pvp-summary', 'pvp_summary');
    getCharData(db, id, characterName, realmSlug, '/pvp-bracket/2v2', 'pvp_2v2');
    getCharData(db, id, characterName, realmSlug, '/pvp-bracket/3v3', 'pvp_3v3');
    getCharData(db, id, characterName, realmSlug, '/pvp-bracket/rbg', 'pvp_rbg');
    getCharData(db, id, characterName, realmSlug, '/quests/completed', 'quests_completed');
    getCharData(db, id, characterName, realmSlug, '/reputations', 'reputations');
    // getCharData(db, id, characterName, realmSlug, '/soulbinds', 'soulbinds');
    getCharData(db, id, characterName, realmSlug, '/specializations', 'specializations');
    getCharData(db, id, characterName, realmSlug, '/statistics', 'character_statistics');
    getCharData(db, id, characterName, realmSlug, '/titles', 'titles');
}
