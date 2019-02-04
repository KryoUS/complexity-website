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
const routes = require('./routes');
const session = require('express-session');
const bnetStrategy = require(`${__dirname}/strategy.js`);
const cron = require('./cronjobs/cronjobs');

//Start Cron Job Timers
cron.jobs();

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
    ssl: false
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

/* API Routes */
app.use('/', routes);
//Catch all routes that don't match anything and send to Build/index.js for Production
app.get('/*', express.static(
    path.join(__dirname, '..', 'build')
));

//Start HTTPS Server
let port = process.env.PORT || 3050;
https.createServer( {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}, app ).listen(port, () => {
    console.log( 'Express server listening on port ' + port );
});