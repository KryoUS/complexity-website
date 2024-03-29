const axios = require('axios');

module.exports.userController = {
    setMain: (req, res, next) => {

        req.app.get('db').users.update({id: req.body.id}, {
            main: req.body.main,
            mainavatarsmall: req.body.mainAvatarSmall,
            mainavatarmed: req.body.mainAvatarMed,
            mainavatarlarge: req.body.mainAvatarLarge
        }).then(response => {
            req.session.passport.user.main = req.body.main;
            req.session.passport.user.mainAvatarSmall = req.body.mainAvatarSmall;
            req.session.passport.user.mainAvatarMed = req.body.mainAvatarMed;
            req.session.passport.user.mainAvatarLarge = req.body.mainAvatarLarge;
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB User New Main Error');
            console.log(error);
            res.status(500).send('DB User New Main Error');
        });
    },

    auth: (req, res) => {
        
        if (req.isAuthenticated()) {
            let userObj = {
                id: req.session.passport.user.id,
                isAdmin: req.session.passport.user.isAdmin,
                chars: req.session.passport.user.chars,
                main: req.session.passport.user.main,
                mainAvatarSmall: req.session.passport.user.mainAvatarSmall,
                mainAvatarMed: req.session.passport.user.mainAvatarMed,
                mainAvatarLarge: req.session.passport.user.mainAvatarLarge
            };
            res.status(200).send(userObj);
        } else {
            res.sendStatus(401);
        }
    },

    bnetCallback: (req, res) => {
        console.log('Callback Hit');
    
        if (req.isAuthenticated()) {

            const now = new Date();
    
            req.app.get('db').users.findOne({id: req.session.passport.user.id}).then(findRes => {
    
                //If the Massive response is null, we need to insert the user
                if (findRes === null) {
    
                    //Perform Massive insert to PostgreSQL
                    req.app.get('db').users.insert({id: req.session.passport.user.id}).then(insertRes => {
                        
                        //Get User Character data
                        axios.get(`https://us.api.blizzard.com/wow/user/characters?access_token=${req.session.passport.user.token}`).then(charRes => {
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
                                    req.app.get('db').users.update({
                                        id: req.session.passport.user.id
                                    }, {
                                        main: userCharArray[0].name, 
                                        mainavatarsmall: userCharArray[0].avatarSmall,
                                        mainavatarmed: userCharArray[0].avatarMed,
                                        mainavatarlarge: userCharArray[0].avatarLarge
                                    }).then(updateRes => {
                                        req.session.passport.user.isAdmin = updateRes[0].is_admin;
                                        req.session.passport.user.main = updateRes[0].main;
                                        req.session.passport.user.mainAvatarSmall = updateRes[0].mainavatarsmall;
                                        req.session.passport.user.mainAvatarMed = updateRes[0].mainavatarmed;
                                        req.session.passport.user.mainAvatarLarge = updateRes[0].mainavatarlarge;
                                        req.session.passport.user.chars = userCharArray;
                                        //ISSUE
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
                    req.session.passport.user.isAdmin = findRes.is_admin;
                    req.session.passport.user.main = findRes.main;
                    req.session.passport.user.mainAvatarSmall = findRes.mainavatarsmall;
                    req.session.passport.user.mainAvatarMed = findRes.mainavatarmed;
                    req.session.passport.user.mainAvatarLarge = findRes.mainavatarlarge;
                    
                    //Get User Character data
                    axios.get(`https://us.api.blizzard.com/wow/user/characters?access_token=${req.session.passport.user.token}`).then(charRes => {
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
    },

    logout: (req, res) => {
        console.log('Logout hit');
        req.logOut();
        return res.redirect('/');
    },
}