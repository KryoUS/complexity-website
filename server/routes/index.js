//Libraries
const routes = require('express').Router();
const passport = require('passport');

//Controllers
const blizzardApi = require('../controllers/blizzard_api_controller');
const raiderioApi = require('../controllers/raiderio_api_controller');
const wowprogressApi = require('../controllers/wowprogress_api_controller');
const blizztrackApi = require('../controllers/Blizztrack/blizztrack_api_controller');
const releaseController = require('../controllers/releases_controller');
const stats = require('../controllers/stats_controller');
const news = require('../controllers/news_controller');
const raiders = require('../controllers/raider_controller');
const userFunctions = require('../controllers/user_controller');

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

const requireAdmin = (req, res, next) => {
    if (req.session.passport.user.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }    
}

// API Initialization Variables
blizzardApi.setBlizzardToken();
blizztrackApi.setWoWBluePosts();
blizztrackApi.setWoWLatestPosts();
blizztrackApi.setWoWPatchNotes();
blizztrackApi.setWoWVersion();
raiderioApi.setWowMythicAffixes();
raiderioApi.setWowRankingsGuild();
wowprogressApi.setWowProgressGuild();

/*      API ENDPOINTS       */
//Battle.net Passport Auth Endpoints
routes.get('/auth/login', passport.authenticate('bnet'));
routes.get('/auth', userFunctions.auth);
routes.post('/auth/newmain', checkAuth, userFunctions.setMain);
routes.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), userFunctions.bnetCallback);
routes.get('/auth/logout', checkAuth, userFunctions.logout);
//Releases Endpoints from DB
routes.get('/api/releases', releaseController.get);
routes.get('/api/allreleases', releaseController.getAll);
routes.post('/api/releases', requireAdmin, releaseController.post);
routes.delete('/api/deleterelease/:id', requireAdmin, releaseController.delete);
//News Endpoints from DB
routes.get('/api/news', news.get);
routes.get('/api/guildnews', news.getGuildNews);
//Raider Endpoints from DB
routes.get('/api/raiders', raiders.get);
//Guild Members Endpoint from DB
routes.get('/api/members', stats.members);
//Stat Endpoints from DB
routes.get('/api/stats/character', stats.characters);
routes.get('/api/stats/consumables', stats.consumables);
routes.get('/api/stats/combat', stats.combat);
routes.get('/api/stats/kills', stats.kills);
routes.get('/api/stats/deaths', stats.deaths);
routes.get('/api/stats/pve', stats.pve);
routes.get('/api/stats/professions', stats.professions);
routes.get('/api/stats/travel', stats.travel);
routes.get('/api/stats/emotes', stats.emotes);
routes.get('/api/stats/pvp', stats.pvp);
routes.get('/api/stats/arena', stats.arena);
routes.get('/api/stats/pets', stats.pets);
//WoW API Endpoints
routes.get('/api/wow/server/status', blizzardApi.getServerStatus);
routes.get('/api/wow/token/price', blizzardApi.getTokenPrice);
routes.put('/api/wow/character/:character&:realm/achievements', blizzardApi.getCharacterAchievements);
routes.put('/api/wow/character/:character&:realm/mounts', blizzardApi.getCharacterMounts);
routes.put('/api/wow/character/:character&:realm/hunterPets', blizzardApi.getCharacterHunterPets);
routes.put('/api/wow/character/:character&:realm/stats', blizzardApi.getCharacterStats);
routes.put('/api/wow/character/:character&:realm/items', blizzardApi.getCharacterItems);
routes.put('/api/wow/character/:character&:realm/pets', blizzardApi.getCharacterPets);
routes.get('/api/wow/pet/species/:speciesId', blizzardApi.getPetsSpecies);
routes.get('/api/wow/pet/stats/:speciesId&:level&:breedId&:qualityId', blizzardApi.getPetsStats);
//Ranking Endpoint from WoWProgress API
routes.get('/api/wowprogress/guildranking', wowprogressApi.getWowProgressGuild);
//Ranking Endpoint from RaiderIO API
routes.get('/api/raiderio/guildranking', raiderioApi.getWowRankingsGuild);
//Mythic Affixes Endpoint from RaiderIO API
routes.get('/api/raiderio/mythicaffixes', raiderioApi.getWowMythicAffixes);
//Blizztrack API Endpoints
routes.get('/api/blizztrack/wow/blueposts', blizztrackApi.getWoWBluePosts);
routes.get('/api/blizztrack/wow/latestposts', blizztrackApi.getWoWLatestPosts);
routes.get('/api/blizztrack/wow/patchnotes', blizztrackApi.getWoWPatchNotes);
routes.get('/api/blizztrack/wow/version', blizztrackApi.getWoWVersion);

module.exports = routes;