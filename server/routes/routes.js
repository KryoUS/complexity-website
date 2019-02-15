//Libraries
const routes = require('express').Router();
const passport = require('passport');

//Controllers
const blizzardApi = require('../controllers/blizzard_api_controller');
const raiderioApi = require('../controllers/raiderio_api_controller');
const wowprogressApi = require('../controllers/wowprogress_api_controller');
const blizztrackApi = require('../controllers/Blizztrack/blizztrack_api_controller');
const releaseController = require('../controllers/Database/releases_controller');
const stats = require('../controllers/Database/stats_controller');
const news = require('../controllers/Database/news_controller');
const raiders = require('../controllers/Database/raider_controller');
const userFunctions = require('../controllers/Database/user_controller');
const quotes = require('../controllers/Database/quotes_controller');

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

const requireSession = (req, res, next) => {
    if (req.session.cookie) {
        next();
    } else {
        res.sendStatus(401);
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
routes.get('/auth', requireSession, userFunctions.auth);
routes.post('/auth/newmain', checkAuth, userFunctions.setMain);
routes.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), userFunctions.bnetCallback);
routes.get('/auth/logout', checkAuth, userFunctions.logout);
//Releases Endpoints from DB
routes.get('/api/releases', requireSession, releaseController.get);
routes.get('/api/allreleases', requireSession, releaseController.getAll);
routes.post('/api/releases', requireAdmin, releaseController.post);
routes.delete('/api/deleterelease/:id', requireAdmin, releaseController.delete);
//News Endpoints from DB
routes.get('/api/news', requireSession, news.get);
routes.get('/api/guildnews', requireSession, news.getGuildNews);
//Raider Endpoints from DB
routes.get('/api/raiders', requireSession, raiders.get);
//Guild Members Endpoint from DB
routes.get('/api/members', requireSession, stats.members);
routes.get('/api/members/names', requireSession, stats.memberNames);
//Stat Endpoints from DB
routes.get('/api/stats/character', requireSession, stats.characters);
routes.get('/api/stats/consumables', requireSession, stats.consumables);
routes.get('/api/stats/combat', requireSession, stats.combat);
routes.get('/api/stats/kills', requireSession, stats.kills);
routes.get('/api/stats/deaths', requireSession, stats.deaths);
routes.get('/api/stats/pve', requireSession, stats.pve);
routes.get('/api/stats/professions', requireSession, stats.professions);
routes.get('/api/stats/travel', requireSession, stats.travel);
routes.get('/api/stats/emotes', requireSession, stats.emotes);
routes.get('/api/stats/pvp', requireSession, stats.pvp);
routes.get('/api/stats/arena', requireSession, stats.arena);
routes.get('/api/stats/pets', requireSession, stats.pets);
//Quotes Endpoint from DB
routes.get('/api/complexity/quotes', requireSession, quotes.get);
routes.post('/api/complexity/quotes', requireAdmin, quotes.post);
//WoW API Endpoints
routes.get('/api/wow/server/status', requireSession, blizzardApi.getServerStatus);
routes.get('/api/wow/token/price', requireSession, blizzardApi.getTokenPrice);
routes.put('/api/wow/character/:character&:realm/achievements', requireSession, blizzardApi.getCharacterAchievements);
routes.put('/api/wow/character/:character&:realm/mounts', requireSession, blizzardApi.getCharacterMounts);
routes.put('/api/wow/character/:character&:realm/hunterPets', requireSession, blizzardApi.getCharacterHunterPets);
routes.put('/api/wow/character/:character&:realm/stats', requireSession, blizzardApi.getCharacterStats);
routes.put('/api/wow/character/:character&:realm/items', requireSession, blizzardApi.getCharacterItems);
routes.put('/api/wow/character/:character&:realm/pets', requireSession, blizzardApi.getCharacterPets);
routes.get('/api/wow/pet/species/:speciesId', requireSession, blizzardApi.getPetsSpecies);
routes.get('/api/wow/pet/stats/:speciesId&:level&:breedId&:qualityId', requireSession, blizzardApi.getPetsStats);
routes.put('/api/wow/character/:character&:realm/professions', requireSession, blizzardApi.getCharacterProfessions);
//Ranking Endpoint from WoWProgress API
routes.get('/api/wowprogress/guildranking', requireSession, wowprogressApi.getWowProgressGuild);
//Ranking Endpoint from RaiderIO API
routes.get('/api/raiderio/guildranking', requireSession, raiderioApi.getWowRankingsGuild);
//Mythic Affixes Endpoint from RaiderIO API
routes.get('/api/raiderio/mythicaffixes', requireSession, raiderioApi.getWowMythicAffixes);
//Blizztrack API Endpoints
routes.get('/api/blizztrack/wow/blueposts', requireSession, blizztrackApi.getWoWBluePosts);
routes.get('/api/blizztrack/wow/latestposts', requireSession, blizztrackApi.getWoWLatestPosts);
routes.get('/api/blizztrack/wow/patchnotes', requireSession, blizztrackApi.getWoWPatchNotes);
routes.get('/api/blizztrack/wow/version', requireSession, blizztrackApi.getWoWVersion);

module.exports = routes;