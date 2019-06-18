//Environment Variables
const path = require('path');
//require('dotenv').config({path: path.join(__dirname, '.env')});

//Libraries
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = require('./app');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const massive = require('massive');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/routes');
const session = require('express-session');
const bnetStrategy = require(`${__dirname}/strategy.js`);
const cron = require('./cronjobs/cronjobs');

const test = (req, res, next) => {
    console.log(req.ip);
    next();
};

//Start Cron Job Timers
cron.jobs();

//Basic Express Security with Helmet and API Rate Limiting
app.use(helmet());
//Trust NGINX https proxy
app.set('trust proxy', true);
//Enable rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

//Body Parser
app.use( bodyParser.json() );

//Cors
app.use(cors());

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
app.use(express.static(__dirname + '/../build'));

//Auth Serialize
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
//Auth Deserialize
passport.deserializeUser(function(user, done) {
    done(null, user);
});

//Massive
massive({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: true
}).then(instance => {
    app.set('db', instance);

    /* API Routes */
    app.use('/', routes);
    //Catch all routes that don't match anything and send to Build/index.js for Production
    app.get('/*', test, express.static(
        path.join(__dirname, '..', 'client', 'build')
    ));
    
}).catch(error => {
    console.log('Massive Error: ', error)
});

//Start Server
let port = process.env.PORT || 3050;
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
