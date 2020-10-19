//Libraries
const routes = require('express').Router();
const passport = require('passport');

//Controllers
const blizzardApi = require('../controllers/blizzard_api_controller');
const raiderioApi = require('../controllers/raiderio_api_controller');
const wowprogressApi = require('../controllers/wowprogress_api_controller');
const releaseController = require('../controllers/Database/releases_controller');
const stats = require('../controllers/Database/stats_controller');
const members = require('../controllers/Database/members_controller');
const news = require('../controllers/Database/news_controller');
const raiders = require('../controllers/Database/raider_controller');
const userFunctions = require('../controllers/Database/user_controller');
const quotes = require('../controllers/Database/quotes_controller');
const logs = require('../controllers/Database/logs_controller');
const dialogFlow = require('../controllers/GoogleAssistant/GoogleAssistant');
const raidbots = require('../controllers/Database/raidbots_controller');
const simulationcraft = require('../controllers/Database/simulationcraft_controller');
const icons = require('../controllers/Database/icons_controller');

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

const requireAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.session.passport.user.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }    
}

// API Initialization Variables
blizzardApi.setBlizzardToken();

/*      API ENDPOINTS       */
//Battle.net Passport Auth Endpoints
// routes.get('/auth/login', passport.authenticate('bnet'));
// routes.get('/auth', userFunctions.auth);
// routes.post('/auth/newmain', checkAuth, userFunctions.setMain);
// routes.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), userFunctions.bnetCallback);
// routes.get('/auth/logout', checkAuth, userFunctions.logout);
//Logging routes from DB
// routes.get('/logs/discordbot', requireAdmin, logs.getDiscordBot);
// routes.get('/logs/serviceslog', requireAdmin, logs.getServicesLog);
//Releases Endpoints from DB
routes.get('/api/releases', releaseController.get);
routes.get('/api/allreleases', releaseController.getAll);
routes.post('/api/releases', requireAdmin, releaseController.post);
routes.delete('/api/deleterelease/:id', requireAdmin, releaseController.delete);
//News Endpoints from DB
routes.get('/api/news', news.get);
routes.get('/api/breakingnews', news.getAlert);
routes.get('/api/guildnews', news.getGuildNews);
//Raider Endpoints from DB
routes.get('/api/raiders', raiders.get);
//Guild Members Endpoint from DB
routes.get('/api/members', stats.members);
routes.get('/api/members/names', stats.memberNames);
routes.get('/api/members/all', members.all);
routes.get('/api/members/specs', members.specsOnly);
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
//Quotes Endpoint from DB
routes.get('/api/complexity/quotes', quotes.get);
routes.post('/api/complexity/quotes', requireAdmin, quotes.post);
//WoW API Endpoints
// routes.get('/api/wow/server/status', blizzardApi.getServerStatus);
// routes.get('/api/wow/token/price', blizzardApi.getTokenPrice);
// routes.put('/api/wow/character/:character&:realm/achievements', blizzardApi.getCharacterAchievements);
// routes.put('/api/wow/character/:character&:realm/mounts', blizzardApi.getCharacterMounts);
// routes.put('/api/wow/character/:character&:realm/hunterPets', blizzardApi.getCharacterHunterPets);
// routes.put('/api/wow/character/:character&:realm/stats', blizzardApi.getCharacterStats);
// routes.put('/api/wow/character/:character&:realm/items', blizzardApi.getCharacterItems);
// routes.put('/api/wow/character/:character&:realm/pets', blizzardApi.getCharacterPets);
// routes.get('/api/wow/pet/species/:speciesId', blizzardApi.getPetsSpecies);
// routes.get('/api/wow/pet/stats/:speciesId&:level&:breedId&:qualityId', blizzardApi.getPetsStats);
// routes.put('/api/wow/character/:character&:realm/professions', blizzardApi.getCharacterProfessions);
// routes.put('/api/wow/character/:character&:realm/progression', blizzardApi.getCharacterProgression);
// routes.put('/api/wow/character/:character&:realm/pvp', blizzardApi.getCharacterPVP);
// routes.put('/api/wow/character/:character&:realm/reputation', blizzardApi.getCharacterReputation);
// routes.put('/api/wow/character/:character&:realm/statistics', blizzardApi.getCharacterStatistics);
// routes.put('/api/wow/character/:character&:realm/talents', blizzardApi.getCharacterTalents);
//WoW API Data Collection Endpoints
routes.get('/api/wow/collectItemIcons', requireAdmin, icons.getItemIcons);
//Ranking Endpoint from WoWProgress API
routes.get('/api/wowprogress/guildranking', wowprogressApi.getWowProgressGuild);
//Ranking Endpoint from RaiderIO API
routes.get('/api/raiderio/guildranking', raiderioApi.getWowRankingsGuild);
//Mythic Affixes Endpoint from RaiderIO API
routes.get('/api/raiderio/mythicaffixes', raiderioApi.getWowMythicAffixes);
//Google Assistant Endpoint
routes.post('/fulfillment', dialogFlow);
//Raidbots Endpoints
routes.put('/api/raidbots/character/:selectedCharName&:selectedCharRealm', raidbots.getByCharName);
//SimulationCraft Endpoints
routes.get('/api/simulationcraft', simulationcraft.get);

module.exports = routes;