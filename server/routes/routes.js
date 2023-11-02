//Libraries
const { app } = require('../app');
// const routes = app.Router();
const passport = require('passport');

//Controllers
const { blizzardController } = require('../controllers/blizzard_api_controller');
const { raiderIOController } = require('../controllers/raiderio_api_controller');
const { wowProgressController } = require('../controllers/wowprogress_api_controller');
const { releasesController } = require('../controllers/Database/releases_controller');
const { statsController } = require('../controllers/Database/stats_controller');
const { dbCharacters } = require('../controllers/Database/warcraft/characters/getAll');
const { newsController } = require('../controllers/Database/news_controller');
const { raiderController } = require('../controllers/Database/raider_controller');
const { userController } = require('../controllers/Database/user_controller');
const { quotesController } = require('../controllers/Database/quotes_controller');
const { logsController } = require('../controllers/Database/logs_controller');
//const dialogFlow = require('../controllers/GoogleAssistant/GoogleAssistant'); TODO: Complete Rework
const { raidbotsController } = require('../controllers/Database/raidbots_controller');
const { simulationcraftController } = require('../controllers/Database/simulationcraft_controller');
const { iconController } = require('../controllers/Database/icons_controller');
const { twitchController } = require('../controllers/twitch_api_controller');
const { wowNewsController } = require('../controllers/Warcraft/news_controller');

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

const discordBotID = (req, res, next) => {

    if (req.originalUrl.includes("/api/twitch/streamer/golive/") && req.get("Discord-Bot-Id") !== process.env.DISCORD_BOT_ID) {
        res.sendStatus(403);
    } else if (req.originalUrl.includes("/api/twitch/webhooks/list") && req.get("Discord-Bot-Id") !== process.env.DISCORD_BOT_ID) {
        res.sendStatus(403);
    } else if (req.originalUrl.includes("/api/twitch/streamer/removeid/") && req.get("Discord-Bot-Id") !== process.env.DISCORD_BOT_ID) {
        res.sendStatus(403);
    } else {
        next();
    }
}

// API Initialization Variables
//blizzardController.setBlizzardToken();

/*      API ENDPOINTS       */
//Battle.net Passport Auth Endpoints
// app.get('/auth/login', passport.authenticate('bnet'));
// app.get('/auth', userController.auth);
// app.post('/auth/newmain', checkAuth, userController.setMain);
// app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), userController.bnetCallback);
// app.get('/auth/logout', checkAuth, userController.logout);
//Logging routes from DB
// app.get('/logs/discordbot', requireAdmin, logsController.getDiscordBot);
// app.get('/logs/serviceslog', requireAdmin, logsController.getServicesLog);
//Releases Endpoints from DB
app.get('/api/releases', releasesController.get);
app.get('/api/allreleases', releasesController.getAll);
app.post('/api/releases', requireAdmin, releasesController.post);
app.delete('/api/deleterelease/:id', requireAdmin, releasesController.delete);
//News Endpoints from DB
app.get('/api/news', newsController.get);
app.get('/api/breakingnews', newsController.getAlert);
app.get('/api/guildnews', newsController.getGuildNews);
//Raider Endpoints from DB
app.get('/api/raiders', raiderController.get);
//Guild Members Endpoint from DB
app.get('/api/members/all', dbCharacters.getAll);
//Stat Endpoints from DB
app.get('/api/stats/character', statsController.characters);
app.get('/api/stats/consumables', statsController.consumables);
app.get('/api/stats/combat', statsController.combat);
app.get('/api/stats/kills', statsController.kills);
app.get('/api/stats/deaths', statsController.deaths);
app.get('/api/stats/pve', statsController.pve);
app.get('/api/stats/professions', statsController.professions);
app.get('/api/stats/travel', statsController.travel);
app.get('/api/stats/emotes', statsController.emotes);
app.get('/api/stats/pvp', statsController.pvp);
app.get('/api/stats/arena', statsController.arena);
app.get('/api/stats/pets', statsController.pets);
//Quotes Endpoint from DB
app.get('/api/complexity/quotes', quotesController.get);
app.post('/api/complexity/quotes', requireAdmin, quotesController.post);
//WoW API Endpoints
app.get('/api/wow/server/status', blizzardController.getServerStatus);
app.get('/api/wow/token/price', blizzardController.getTokenPrice);
app.get('/api/wow/classes', blizzardController.getClasses);
app.get('/api/wow/blueposts', blizzardController.getBluePosts);
app.get('/api/wow/news', wowNewsController.getWowheadNews);
// app.put('/api/wow/character/:character&:realm/achievements', blizzardController.getCharacterAchievements);
// app.put('/api/wow/character/:character&:realm/mounts', blizzardController.getCharacterMounts);
// app.put('/api/wow/character/:character&:realm/hunterPets', blizzardController.getCharacterHunterPets);
// app.put('/api/wow/character/:character&:realm/stats', blizzardController.getCharacterStats);
// app.put('/api/wow/character/:character&:realm/items', blizzardController.getCharacterItems);
// app.put('/api/wow/character/:character&:realm/pets', blizzardController.getCharacterPets);
// app.get('/api/wow/pet/species/:speciesId', blizzardController.getPetsSpecies);
// app.get('/api/wow/pet/stats/:speciesId&:level&:breedId&:qualityId', blizzardController.getPetsStats);
// app.put('/api/wow/character/:character&:realm/professions', blizzardController.getCharacterProfessions);
// app.put('/api/wow/character/:character&:realm/progression', blizzardController.getCharacterProgression);
// app.put('/api/wow/character/:character&:realm/pvp', blizzardController.getCharacterPVP);
// app.put('/api/wow/character/:character&:realm/reputation', blizzardController.getCharacterReputation);
// app.put('/api/wow/character/:character&:realm/statistics', blizzardController.getCharacterStatistics);
// app.put('/api/wow/character/:character&:realm/talents', blizzardController.getCharacterTalents);
//WoW API Data Collection Endpoints
// app.get('/api/wow/collectItemIcons', requireAdmin, iconController.getItemIcons);
//Ranking Endpoint from WoWProgress API
app.get('/api/wowprogress/guildranking', wowProgressController.getWowProgressGuild);
//Ranking Endpoint from RaiderIO API
app.get('/api/raiderio/guildranking', raiderIOController.getWowRankingsGuild);
//Mythic Affixes Endpoint from RaiderIO API
app.get('/api/raiderio/mythicaffixes', raiderIOController.getWowMythicAffixes);
//Google Assistant Endpoint
//app.post('/fulfillment', dialogFlow); --TODO: Complete Rework
//Raidbots Endpoints
app.put('/api/raidbots/character/:selectedCharName&:selectedCharRealm', raidbotsController.getByCharName);
//SimulationCraft Endpoints
app.get('/api/simulationcraft', simulationcraftController.get);
//Twitch Endpoints
app.put('/api/twitch/streamer/golive/:twitchName', discordBotID, twitchController.addComplexityStream);
app.post('/api/twitch/webhooks/callback', twitchController.webhookCallback);
app.get('/api/twitch/webhooks/list', discordBotID, twitchController.listComplexityStream);
app.delete('/api/twitch/streamer/removeid/:twitchid', discordBotID, twitchController.removeComplexityStream);

module.exports.routes = app;