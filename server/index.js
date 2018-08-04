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
const axios = require('axios');

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

//Battle.net Auth0
app.get('/login', passport.authenticate('bnet'));

//Check for Passport(bnet) Session
app.get('/auth', (req, res) => {
    console.log('Auth Hit');
    if (req.session.passport) {
        let userObj = {};
        userObj.id = req.session.passport.user.id;
        userObj.chars = req.session.passport.user.chars;
        userObj.main = req.session.passport.user.main;
        userObj.mainAvatarSmall = req.session.passport.user.mainAvatarSmall;
        userObj.mainAvatarMed = req.session.passport.user.mainAvatarMed;
        userObj.mainAvatarLarge = req.session.passport.user.mainAvatarLarge;
        res.status(200).send(userObj);
    } else {
        res.sendStatus(401);
    }
});

//Battle.net Auth0 Callback
app.get('/auth/bnet/callback', passport.authenticate('bnet', { failureRedirect: '/' }), (req, res) => {
    console.log('Callback Hit')

    if (req.isAuthenticated()) {
        const db = app.get('db');
        const now = new Date();

        db.users.findOne({id: req.session.passport.user.id}).then(findRes => {

            //If the Massive response is null, we need to insert the user
            if (findRes === null) {

                //Perform Massive insert to PostgreSQL
                db.users.insert({id: req.session.passport.user.id}).then(insertRes => {
                    
                    //Get User Character data
                    axios.get(`https://us.api.battle.net/wow/user/characters?access_token=${req.session.passport.user.token}`).then(charRes => {
                        console.log('User Character API Hit from Massive Insert');
                        let userCharArray = [];

                        charRes.data.characters.forEach((charObj, i) => {
                            // if (now - charObj.lastModified <= 1563480000) {
                            if (charObj.spec) {
                                charObj.avatarSmall = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail}?alt=/wow/static/images/2d/avatar/${charObj.race}-${charObj.gender}.jpg`;
                                charObj.avatarMed = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'inset')}?alt=/wow/static/images/2d/avatar/${charObj.race}-${charObj.gender}.jpg`;
                                charObj.avatarLarge = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'main')}?alt=/wow/static/images/2d/avatar/${charObj.race}-${charObj.gender}.jpg`;
                                userCharArray.push(charObj);
                            }
                            if (i === charRes.data.characters.length-1) {
                                userCharArray.sort((a, b) => {
                                    return b.lastModified - a.lastModified
                                });
                                db.users.update({
                                    id: req.session.passport.user.id
                                }, {
                                    main: userCharArray[0].name, 
                                    mainavatarsmall: userCharArray[0].avatarSmall,
                                    mainavatarmed: userCharArray[0].avatarMed,
                                    mainavatarlarge: userCharArray[0].avatarLarge
                                }).then(updateRes => {
                                    req.session.passport.user.main = updateRes[0].main;
                                    req.session.passport.user.mainAvatarSmall = updateRes[0].mainavatarsmall;
                                    req.session.passport.user.mainAvatarMed = updateRes[0].mainavatarmed;
                                    req.session.passport.user.mainAvatarLarge = updateRes[0].mainavatarlarge;
                                    req.session.passport.user.chars = userCharArray;
                                    return res.redirect('https://localhost:3000');
                                })
                            }
                        });

                    }).catch(blizzApiErr => {
                        console.log('Blizzard API Error on Char Fetch');
                        console.log(blizzApiErr);
                    });

                }).catch(insertError => {
                    console.log('---------------------------------------');
                    console.log('Massive Insert Error!');
                    console.log(insertError);
                    console.log('---------------------------------------');
                });

            } else {
                req.session.passport.user.main = findRes.main;
                req.session.passport.user.mainAvatarSmall = findRes.mainavatarsmall;
                req.session.passport.user.mainAvatarMed = findRes.mainavatarmed;
                req.session.passport.user.mainAvatarLarge = findRes.mainavatarlarge;
                
                //Get User Character data
                axios.get(`https://us.api.battle.net/wow/user/characters?access_token=${req.session.passport.user.token}`).then(charRes => {
                    console.log('User Character API Hit (no Massive Insert)');
                    let userCharArray = [];

                    charRes.data.characters.forEach((charObj, i) => {
                        // if (now - charObj.lastModified <= 1563480000) {
                        if (charObj.spec) {
                            charObj.avatarSmall = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail}?alt=/wow/static/images/2d/avatar/${charObj.race}-${charObj.gender}.jpg`;
                            charObj.avatarMed = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'inset')}?alt=/wow/static/images/2d/avatar/${charObj.race}-${charObj.gender}.jpg`;
                            charObj.avatarLarge = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'main')}?alt=/wow/static/images/2d/avatar/${charObj.race}-${charObj.gender}.jpg`;
                            userCharArray.push(charObj);
                        }
                        if (i === charRes.data.characters.length-1) {
                            userCharArray.sort((a, b) => {
                                return b.lastModified - a.lastModified
                            });
                            req.session.passport.user.chars = userCharArray;
                            return res.redirect('https://localhost:3000');
                        }
                    });

                }).catch(blizzApiErr => {
                    console.log('Blizzard API Error on Char Fetch');
                    console.log(blizzApiErr);
                });
            }
        }).catch(findErr => {
            console.log('Massive Find Connection Error');
            console.log(findErr);
        });
        
    } else {
        console.log('Blizzard OAuth or Session Error!')
    }
    //Maybe return a server error?
});

//Logout endpoint
app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect(`https://localhost:3000`);
})

app.get('/news', (req, res) => {
    const db = app.get('db');
    db.query('select * from news order by news_datetime desc limit 5').then(response => {
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