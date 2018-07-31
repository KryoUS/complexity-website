//Environment Variables
require('dotenv').config();

//Libraries
const https = require('https'); //Only for testing locally?
const express = require('express');
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

//Express-Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
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
    done(null, user[0]);
});

//Battle.net Auth0
app.get('/login', passport.authenticate('bnet'));

//Battle.net Auth0 Callback
app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), (req, res) => {
    //Put user information on Store here?
    console.log(res);
    return res.redirect('/');
});

//Logout endpoint
app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect(`http://localhost:3000#/`);
})

//Local testing SSL
const server = https.createServer( httpsOptions, app );

//Start server
let port = process.env.PORT || 3008;
server.listen( port, () => {
    console.log( 'Express server listening on port ' + server.address().port );
});