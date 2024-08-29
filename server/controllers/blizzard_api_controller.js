const axios = require('axios');
const bnet = require('./Axios/bnet');
const functions = require('./Database/tools/functions');

//Retail Realm Status
let realmObj = {};
//Classic Realm Status
let classicRealmObj = {};
//US WoW Token Price
let tokenPrice = { price: 0 };
//Blue Posts
let bluePosts = [];

const findAchievement = (data, id) => {
    for (let i in data) {
        if (i == 'id' && data[i] == id && data['title']) return data
        if (typeof data[i] == 'object' && findAchievement(data[i], id)) return findAchievement(data[i], id);
    }
    return false
};

async function getClassesAndMedia() {

    let classData = [];

    try {
        const classIndex = await bnet.get(`/data/wow/playable-class/index?namespace=static-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`);
        const classes = await Promise.all(classIndex.data.classes.map((classObj, index) => {
            //TODO: Below is a future problem as it is using the href and I already have set the BaseURL through the Interceptor
            return axios.get(`${classObj.key.href}&access_token=${process.env.BLIZZ_API_TOKEN}`)
                .then(response => {
                    classData[index] = response.data;
                })
        }));
        const specs = await Promise.all(classData.map((classObj, classIndex) => {
            return Promise.all(classObj.specializations.map((specObj, specIndex) => {
                return bnet.get(`/data/wow/media/playable-specialization/${specObj.id}?namespace=static-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`)
                    .then(response => {
                        classData[classIndex].specializations[specIndex].media = response.data;
                    })
            }))
        }));
        // const data = await Promise.all([classIndex, classes, specs]);

        return classData;
    } catch (err) {
        console.log(err.stack);
    }
}

module.exports.blizzardController = {

    setBluePosts: () => {
        axios.get('https://us.forums.blizzard.com/en/wow/groups/blizzard-tracker/posts.json').then(res => {
            bluePosts = res.data;
        }).catch(wowBluePostError => {
            console.log('Blue Post Error: ', wowBluePostError);
        });
    },

    getBluePosts: (req, res) => {
        res.status(200).send(bluePosts);
    },

    getClasses: async (req, res, next) => {
        const data = await getClassesAndMedia();
        res.status(200).send(data);
    },

    getMounts: (req, res) => {
        req.app.get('db').wowcache.findOne({ id: 5 }).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get Mounts Error');
            console.log(error);
            res.status(500).send('DB WoW Get Mounts Error');
        });
    },

    getPets: (req, res) => {
        req.app.get('db').wowcache.findOne({ id: 6 }).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get Pets Error');
            console.log(error);
            res.status(500).send('DB WoW Get Pets Error');
        });
    },

    getPetTypes: (req, res) => {
        req.app.get('db').wowcache.findOne({ id: 7 }).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get PetTypes Error');
            console.log(error);
            res.status(500).send('DB WoW Get PetTypes Error');
        });
    },

    getRaces: (req, res) => {
        req.app.get('db').wowcache.findOne({ id: 8 }).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get Races Error');
            console.log(error);
            res.status(500).send('DB WoW Get Races Error');
        });
    },

    setServerStatus: (req, res) => {
        bnet.get(`/data/wow/connected-realm/77?namespace=dynamic-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            if (realmObj.status && response.data.status.type !== realmObj.status.type) {

                axios.post(process.env.DISCORD_REALMSTATUS_WEBHOOK,
                    {
                        embeds: [
                            {
                                "title": "Server Status",
                                "description": response.data.status.type === "DOWN" ? "Thunderlord is down." : "Thunderlord is up!",
                                "url": "https://worldofwarcraft.com/en-us/game/status/us",
                                "color": response.data.status.type === "DOWN" ? 16711680 : 65280,
                                "footer": {
                                    "text": new Date()
                                },
                                // "image": {
                                //     "url": "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt563e16b3504e5808/62545b180afb5024ae74b677/rc-logo-na.png"
                                // },
                                "thumbnail": {
                                    "url": "https://complexityguild.net/images/tww_logo.webp"
                                },
                                "author": {
                                    "name": "World of Warcraft: Retail"
                                },
                                "timestamp": new Date().toISOString(),
                            }
                        ]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                ).then(discordResponse => {

                }).catch(discordWebhookError => {
                    console.log("Discord Webhook POST Error: ", discordWebhookError);
                });

            };

            realmObj = response.data;
        }).catch(serverStatusError => {
            // Now caught in Axios Interceptor for Bnet
            // console.log('Server Status Error: ?', serverStatusError);
        });

        bnet.get(`/data/wow/connected-realm/4384?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            if (classicRealmObj.status && response.data.status.type !== classicRealmObj.status.type) {

                axios.post(process.env.DISCORD_REALMSTATUS_WEBHOOK,
                    {
                        embeds: [
                            {
                                "title": "Server Status",
                                "description": response.data.status.type === "DOWN" ? "Mankrik is down." : "Mankrik is up!",
                                "url": "https://worldofwarcraft.com/en-us/game/status/classic-us",
                                "color": response.data.status.type === "DOWN" ? 16711680 : 65280,
                                "footer": {
                                    "text": new Date()
                                },
                                // "image": {
                                //     "url": ""
                                // },
                                "thumbnail": {
                                    "url": "https://complexityguild.net/images/cata_logo.png"
                                },
                                "author": {
                                    "name": "World of Warcraft: Cataclysm Classic"
                                },
                                "timestamp": new Date().toISOString(),
                            }
                        ]
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                ).then(discordResponse => {

                }).catch(discordWebhookError => {
                    console.log("Discord Webhook POST Error: ", discordWebhookError);
                });

            };

            classicRealmObj = response.data;
        }).catch(serverStatusError => {
            // Now caught in Axios Interceptor for Bnet
            // console.log('Server Status Error: ?', serverStatusError);
        });
    },

    getServerStatus: (req, res) => {
        res.status(200).send(realmObj);
    },

    //Set Token Price Object
    setTokenPrice: () => {
        bnet.get(`/data/wow/token/index?namespace=dynamic-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            tokenPrice.price = response.data.price;
        }).catch(error => {
            // Now caught in Axios Interceptor for Bnet
            // console.log('Get Token Price Error: ', error);
        });
    },

    getTokenPrice: (req, res) => {
        if (req) {
            res.send(tokenPrice).status(200);
        } else {
            return tokenPrice
        }
    },

    //Guild Endpoints
    // TODO: Do we end up using this?
    // getGuildNews: (req, res) => {
    //      // TODO: Is we use this, the link is old!
    //     axios.get(`https://us.api.blizzard.com/wow/guild/${req.params.realm}/${req.params.guild}?fields=news&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
    //         res.status(200).send(response.data);
    //     }).catch(error => {
    //         console.log('Get Guild News Error: ', error);
    //     });
    // },

}