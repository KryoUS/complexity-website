// IMPORTANT! This test is using a Test Application register and will need to be changed for live once a Domain is set.
//Once a token is received on req.user.token, use https://us.api.battle.net/wow/user/characters?access_token= to get character information.

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
const axios = require('axios');
const releaseController = require('./controllers/releases_controller');
const stats = require('./controllers/stats_controller');
const news = require('./controllers/news_controller');
const raiders = require('./controllers/raider_controller');
const character = require('./controllers/character_controller');
const userFunctions = require('./controllers/user_controller');

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
app.get('/login', passport.authenticate('bnet'));
app.get('/auth', userFunctions.auth);
app.post('/auth/newmain', userFunctions.setMain);
app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), userFunctions.bnetCallback);
app.get('/logout', userFunctions.logout);

//Releases Endpoints
app.get('/api/releases', releaseController.get);

//News Endpoints
app.get('/api/news', news.get);
app.get('/api/guildnews', news.getGuildNews);

//Raider Endpoints
app.get('/api/raiders', raiders.get);

//Character Endpoints
app.put('/characters/:name&:realm', character.feedAndItems);

//Guild Members Endpoint
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

//Catch all routes that don't match anything and send to Build/index.js for Production
app.get('/*', express.static(
    path.join(__dirname, '..', 'build')
));

//Local testing SSL
const server = https.createServer( httpsOptions, app );

//Start server
let port = process.env.PORT || 3050;
server.listen( port, () => {
    console.log( 'Express server listening on port ' + server.address().port );
});