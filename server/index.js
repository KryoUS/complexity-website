// IMPORTANT! This test is using a Test Application register and will need to be changed for live once a Domain is set.
//Once a token is received on req.user.token, use https://us.api.battle.net/wow/user/characters?access_token= to get character information.

//Environment Variables
require('dotenv').config();

//Libraries
const https = require('https'); //Only for testing locally?
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const massive = require('massive');
const session = require('express-session');
const bnetStrategy = require(`${__dirname}/strategy.js`);

//Local testing SSL
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
};

//Express
const app = express();

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
massive(process.env.CONNECTION_STRING).then( db => {
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

//Battle.net Auth0
app.get('/login', passport.authenticate('bnet'));

//Check for auth on server session
app.get('/auth', (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user.id);
    } else {
        res.status(404);
    }
});

//Battle.net Auth0 Callback
app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), (req, res) => {
    return res.redirect('https://localhost:3000');
});

//Logout endpoint
app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect(`https://localhost:3000`);
})

app.get('/news', (req, res) => {
    const db = app.get('db');
    db.query('select * from news order by news_datetime desc limit 10').then(response => {
        res.status(200).send(response);
    }).catch(error => {
        console.log(error)
        res.sendStatus(503);
    })
});

//Local testing SSL
const server = https.createServer( httpsOptions, app );

//Start server
let port = process.env.PORT || 3050;
server.listen( port, () => {
    console.log( 'Express server listening on port ' + server.address().port );
});