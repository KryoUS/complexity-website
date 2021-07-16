//Environment Variables
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});

//Libraries
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = require('./app');
const cors = require('cors');
const passport = require('passport');
const massive = require('massive');
const express = require('express');
const helmet = require('helmet');
const routes = require('./routes/routes');
const session = require('express-session');
const bnetStrategy = require(`${__dirname}/strategy.js`);
const crons = require('./cronjobs/cronjobs');

//Start Cron Job Timers
crons.jobs();

//Basic Express Security with Helmet and API Rate Limiting
app.use( helmet() );

//Cors
app.use( cors() );

//Express-Session
app.use(session({
    httpOnly: true,
    secure: true,
    domain: 'localhost',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1296000000
    }
}));
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( bnetStrategy );
app.use(express.static(path.join(__dirname, '../client/build')));

//Auth Serialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
//Auth Deserialize
passport.deserializeUser(function(user, done) {
    done(null, user);
});

//Massive
(async () => {
    const db = await massive({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        ssl: { rejectUnauthorized: false },
        poolsize: 25
    });

    app.set('db', db);

    /* API Routes */
    app.all('/', routes);
    //Catch all routes that don't match anything and send to Build/index.js for Production
    app.all("/*", (req, res) => {
        console.log("API call didn't match...")
        return res.sendFile(path.join(__dirname + "/../client/build/index.html"));
    });

    //Start Server
    let port = process.env.PORT || 3050;
    //Set to 'false' for Google Assistant testing with NGROK.
    if (process.env.DEV == 'true') {
        https.createServer( 
            {
                key: fs.readFileSync('./security/cert.key'),
                cert: fs.readFileSync('./security/cert.pem')
            }, app ).listen(port, () => {
            console.log( 'HTTPS Express server listening on port ' + port );
        });
    } else {
        http.createServer(app).listen(port, () => {
            console.log( 'HTTP Express server listening on port ' + port );
        });
    };
    
})();
