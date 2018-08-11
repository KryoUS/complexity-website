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

//Local testing SSL
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
};

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
        let userObj = {
            id: req.session.passport.user.id,
            chars: req.session.passport.user.chars,
            main: req.session.passport.user.main,
            mainAvatarSmall: req.session.passport.user.mainAvatarSmall,
            mainAvatarMed: req.session.passport.user.mainAvatarMed,
            mainAvatarLarge: req.session.passport.user.mainAvatarLarge,
        };
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
                                charObj.avatarMed = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'inset')}?alt=/wow/static/images/2d/inset/${charObj.race}-${charObj.gender}.jpg`;
                                charObj.avatarLarge = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'main')}?alt=/wow/static/images/2d/main/${charObj.race}-${charObj.gender}.jpg`;
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
                            charObj.avatarMed = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'inset')}?alt=/wow/static/images/2d/inset/${charObj.race}-${charObj.gender}.jpg`;
                            charObj.avatarLarge = `https://render-us.worldofwarcraft.com/character/${charObj.thumbnail.replace('avatar', 'main')}?alt=/wow/static/images/2d/main/${charObj.race}-${charObj.gender}.jpg`;
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

app.get('/api/news', (req, res) => {
    const db = app.get('db');
    db.query('select * from news order by news_datetime desc limit 20').then(response => {
        res.status(200).send(response);
    }).catch(error => {
        console.log(error)
        res.sendStatus(503);
    })
});

app.get('/api/releases', (req, res) => {
    const db = app.get('db');
    const now = new Date().getTime();

    db.query(`select * from releases where release_date > ${now} order by release_date limit 5`).then(response => {
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(200).send(null);
        }
    }).catch(error => {
        console.log('Releases Query Error');
        console.log(error);
    });
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