//Environment Variables
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});

//Libraries
const https = require('https'); //Only for testing locally?
const fs = require('fs');
const app = require('./app');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const bnetStrategy = require(`${__dirname}/strategy.js`);
const CronJob = require('cron').CronJob;

//Controllers
const releaseController = require('./controllers/releases_controller');
const stats = require('./controllers/stats_controller');
const news = require('./controllers/news_controller');
const raiders = require('./controllers/raider_controller');
const character = require('./controllers/character_controller');
const userFunctions = require('./controllers/user_controller');

//Cron Controllers
const blizzardCrons = require('./cronjobs/blizzardapi');
const wowProgressCrons = require('./cronjobs/wow_progress_api');
const raiderIOCrons = require('./cronjobs/raider_io_api');

/*      CRON JOBS       */
//Set Info on Server Initialization for Cron Jobs
blizzardCrons.setServerStatus();
wowProgressCrons.setWowProgressGuild();
raiderIOCrons.setWowRankingsGuild();
//Define Cron Jobs
const thunderlordStatusCron = new CronJob('00 */5 * * * *', () => blizzardCrons.setServerStatus(), null, false, 'America/Denver');
const complexityRankingsCron = new CronJob('00 30 0-23 * * 0-6', () => {
    wowProgressCrons.setWowProgressGuild();
    raiderIOCrons.setWowRankingsGuild();
}, null, false, 'America/Denver');

//Local testing SSL
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
};

//Body Parser
app.use( bodyParser.json() );

//Cors
app.use(cors());

//Express-Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1296000000 }
}));
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( bnetStrategy );
// app.use(express.static(__dirname + '/../build'));

//Massive
massive({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: true
}).then( db => {
    app.set('db', db);
});

//Auth Serialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
//Auth Deserialize
passport.deserializeUser(function(user, done) {
    done(null, user);
});

/*      API ENDPOINTS       */
//Battle.net Passport Auth Endpoints
app.get('/auth/login', passport.authenticate('bnet'));
app.get('/auth', userFunctions.auth);
app.post('/auth/newmain', userFunctions.setMain);
app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), userFunctions.bnetCallback);
app.get('/auth/logout', userFunctions.logout);
//Releases Endpoints from DB
app.get('/api/releases', releaseController.get);
app.get('/api/allreleases', releaseController.getAll);
app.post('/api/releases', releaseController.post);
app.delete('/api/deleterelease/:id', releaseController.delete);
//News Endpoints from DB
app.get('/api/news', news.get);
app.get('/api/guildnews', news.getGuildNews);
//Raider Endpoints from DB
app.get('/api/raiders', raiders.get);
//Character Endpoints from WoW API
app.put('/characters/:name&:realm', character.feedAndItems);
//Guild Members Endpoint from DB
app.get('/api/members', stats.members);
//Stat Endpoints
app.get('/api/stats/character', stats.characters);
app.get('/api/stats/consumables', stats.consumables);
app.get('/api/stats/combat', stats.combat);
app.get('/api/stats/kills', stats.kills);
app.get('/api/stats/deaths', stats.deaths);
app.get('/api/stats/pve', stats.pve);
app.get('/api/stats/professions', stats.professions);
app.get('/api/stats/travel', stats.travel);
app.get('/api/stats/emotes', stats.emotes);
app.get('/api/stats/pvp', stats.pvp);
app.get('/api/stats/arena', stats.arena);
app.get('/api/stats/pets', stats.pets);
//WoW Realm Status Endpoint
app.get('/api/wow/server/status', blizzardCrons.getServerStatus);
//WoWProgress Ranking Endpoint
app.get('/api/wowprogress/guildranking', wowProgressCrons.getWowProgressGuild);
//RaiderIO Ranking Endpoint
app.get('/api/raiderio/guildranking', raiderIOCrons.getWowRankingsGuild);


//Catch all routes that don't match anything and send to Build/index.js for Production
app.get('/*', express.static(
    path.join(__dirname, '..', 'build')
));

//Local testing SSL
const server = https.createServer( httpsOptions, app );

//Start Cron Job Timers
thunderlordStatusCron.start();
complexityRankingsCron.start();

//Start server
let port = process.env.PORT || 3050;
server.listen( port, () => {
    console.log( 'Express server listening on port ' + server.address().port );
});