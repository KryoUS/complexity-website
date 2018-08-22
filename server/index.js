// IMPORTANT! This test is using a Test Application register and will need to be changed for live once a Domain is set.
//Once a token is received on req.user.token, use https://us.api.battle.net/wow/user/characters?access_token= to get character information.

//Environment Variables
require('dotenv').config();

//Libraries
const https = require('https'); //Only for testing locally?
const fs = require('fs');
const app = require('./app');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const massive = require('massive');
const session = require('express-session');
const bnetStrategy = require(`${__dirname}/strategy.js`);
const axios = require('axios');
const releaseController = require('./controllers/releases_controller');
const stats = require('./controllers/stats_controller');
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
})

//Auth Serialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
//Auth Deserialize
passport.deserializeUser(function(user, done) {
    done(null, user);
});

//Battle.net Passport Auth Endpoints
app.get('/login', passport.authenticate('bnet'));
app.get('/auth', userFunctions.auth);
app.post('/auth/newmain', userFunctions.setMain);
app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), userFunctions.bnetCallback);
app.get('/logout', (req, res) => {
    console.log('Logout hit');
    req.logOut();
    return res.redirect('/');
});

//Releases Endpoints
app.get('/api/releases', releaseController.get);

app.get('/api/news', (req, res) => {
    const db = app.get('db');
    db.query('select * from news order by news_datetime desc limit 20').then(response => {
        res.status(200).send(response);
    }).catch(error => {
        console.log(error)
        res.sendStatus(503);
    })
});

app.get('/api/guildnews', (req, res) => {
    let newsFeed = {};

    axios.get(`https://us.api.battle.net/wow/guild/Thunderlord/Complexity?fields=news&locale=en_US&apikey=${process.env.APIKEY}`).then(newsRes => {
        
        newsFeed.lastModified = newsRes.data.lastModified;
        newsFeed.news = newsRes.data.news;
        res.status(200).send(newsFeed);

    }).catch(error => {
        console.log('WoW API Error');
        console.log(error);
    })
})

app.get('/api/raiders', (req, res) => {
    const db = app.get('db');

    db.query('select character_name, rank, realm, avatar_med, avatar_large, spec_icon, spec_desc from characters where raider = 1').then(response => {
        res.status(200).send(response);
    }).catch(error => {
        console.log('Raider DB Error');
        console.log(error);
        res.status(500).send('Raider DB Call Error');
    })
})

app.put('/characters/:name&:realm', (req, res) => {
    const { name, realm } = req.params;

    axios.get(`https://us.api.battle.net/wow/character/${realm}/${name}?fields=feed%2C+items&locale=en_US&apikey=${process.env.APIKEY}`).then(response => {
        res.status(200).send(response.data);
    }).catch(error => {
        console.log('WoW Character Items API Error');
        console.log(error);
        res.status(500).send('WoW Character API Error');
    });
})

app.get('/api/members', (req, res) => {
    const db = app.get('db');

    db.query('select character_name, rank, level, race, spec_name, class, realm from characters order by rank, character_name').then(response => {
        axios.get(`https://us.api.battle.net/wow/data/character/races?locale=en_US&apikey=${process.env.APIKEY}`).then(races => {
            axios.get(`https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=${process.env.APIKEY}`).then(classes => {
                response.map((char, index) => {
                    let raceIndex = races.data.races.map((e) => {return e.id}).indexOf(char.race);
                    let classIndex = classes.data.classes.map((e) => {return e.id}).indexOf(char.class);
                    response[index].race = races.data.races[raceIndex].name;
                    response[index].class = classes.data.classes[classIndex].name;
                });
                res.status(200).send(response);
            }).catch(classError => {
                console.log('API Class Call Error');
                console.log(classError);
                res.status(500).send('API Class Call Error');
            })
        }).catch(raceError => {
            console.log('API Race Call Error');
            console.log(raceError);
            res.status(500).send('API Race Call Error');
        })
    }).catch(error => {
        console.log('Member DB Call Error')
        console.log(error);
        res.status(500).send('Member DB Call Error');
    })
})

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

//Local testing SSL
const server = https.createServer( httpsOptions, app );

//Start server
let port = process.env.PORT || 3050;
server.listen( port, () => {
    console.log( 'Express server listening on port ' + server.address().port );
});