const axios = require('axios');
const functions = require('./Database/tools/functions');

//Retail Realm Status
let realmObj = {};
//Classic Realm Status
let classicRealmObj = {};
//US WoW Token Price
let tokenPrice = {price: 0};
//Blue Posts
let bluePosts = [];

const findAchievement = (data, id) => {
    for (let i in data) {
        if (i == 'id' && data[i] == id && data['title']) return data
        if (typeof data[i] == 'object' && findAchievement(data[i], id)) return findAchievement(data[i], id);
    }
    return false
};

const achievementInfo = (arr, id) => {
    let achievementObject = {};
    let loop = true;

    arr.achievements.map((obj) => {
        if (loop == true) {
            let category = '';
            if (obj.name) category = obj.name;
            achievementArray = findAchievement(obj, id);
            if (achievementArray != false) {
                achievementArray.category = category;
                achievementObject = achievementArray;
                loop = false;
                return achievementObject
            }
        }
    });
    return achievementObject
}

const className = (classNum, classesArr) => {
    classesArr.map(obj => {
        if (obj.id === classNum) {return obj.name};
    });
};

const createSpellIconInClause = (arr) => {
    let spellIds = '';

    arr.map(obj => {
        if (obj.talents) {
            obj.talents.map(talentObj => {
                spellIds += talentObj.spell_tooltip.spell.id + ',';
            });
        }

        if (obj.pvp_talent_slots) {
            obj.pvp_talent_slots.map(pvpObj => {
                spellIds += pvpObj.selected.spell_tooltip.spell.id + ',';
            });
        }
    });

    return spellIds.replace(/.$/,'');
};

const createItemIconInClause = (arr) => {
    let itemIds = '';

    arr.map(obj => {
        if (obj.item) {
            itemIds += obj.item.id + ',';
        }
    });

    return itemIds.replace(/.$/,'');
};

async function getClassesAndMedia() {

    let classData = [];

    try {
        const classIndex = await axios.get(`https://us.api.blizzard.com/data/wow/playable-class/index?namespace=static-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`);
        const classes = await Promise.all(classIndex.data.classes.map((classObj, index) => {
            return axios.get(`${classObj.key.href}&access_token=${process.env.BLIZZ_API_TOKEN}`)
            .then(response => {
                classData[index] = response.data;
            })
        }));
        const specs = await Promise.all(classData.map((classObj, classIndex) => {
            return Promise.all(classObj.specializations.map((specObj, specIndex) => {
                return axios.get(`https://us.api.blizzard.com/data/wow/media/playable-specialization/${specObj.id}?namespace=static-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`)
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
    setBlizzardToken: () => {
        axios.post(`https://us.battle.net/oauth/token`, 'grant_type=client_credentials', {
            auth: {
                username: process.env.BLIZZ_API_CLIENT_ID, 
                password: process.env.BLIZZ_API_CLIENT_SECRET
            }
        }).then(response => {
            process.env.BLIZZ_API_TOKEN = response.data.access_token;
            if (tokenPrice.price === 0) {module.exports.blizzardController.setTokenPrice()}
            if (!realmObj.status) {module.exports.blizzardController.setServerStatus();}
        }).catch(wowTokenFetchError => {
            console.log('WoW API Token Fetch Error: ', wowTokenFetchError);
        });
    },

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
        req.app.get('db').wowcache.findOne({id: 5}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get Mounts Error');
            console.log(error);
            res.status(500).send('DB WoW Get Mounts Error');
        });
    },

    getPets: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 6}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get Pets Error');
            console.log(error);
            res.status(500).send('DB WoW Get Pets Error');
        });
    },

    getPetTypes: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 7}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get PetTypes Error');
            console.log(error);
            res.status(500).send('DB WoW Get PetTypes Error');
        });
    },

    getRaces: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 8}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoW Get Races Error');
            console.log(error);
            res.status(500).send('DB WoW Get Races Error');
        });
    },

    setServerStatus: (req, res) => {
        axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/77?namespace=dynamic-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
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
                                "image": {
                                    "url": "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt563e16b3504e5808/62545b180afb5024ae74b677/rc-logo-na.png"
                                },
                                // "thumbnail": {
                                //     "url": ""
                                // },
                                "author": {
                                    "name": "World of Warcraft: Retail"
                                },
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
            console.log('Server Status Error: ?', serverStatusError);
        });

        axios.get(`https://us.api.blizzard.com/data/wow/connected-realm/4384?namespace=dynamic-classic-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
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
                                "image": {
                                    "url": "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/bltac8057c02d5c75cd/624b7a821e44bf0352b08549/logo_na.png"
                                },
                                // "thumbnail": {
                                //     "url": ""
                                // },
                                "author": {
                                    "name": "World of Warcraft: Wrath of the Lich King Classic"
                                },
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
            console.log('Server Status Error: ?', serverStatusError);
        });
    },
    
    getServerStatus: (req, res) => {
        res.status(200).send(realmObj);
    },

    //Set Token Price Object
    setTokenPrice: () => {
        axios.get(`https://us.api.blizzard.com/data/wow/token/index?namespace=dynamic-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            tokenPrice.price = response.data.price;
        }).catch(error => {
            console.log('Get Token Price Error: ', error);
        });
    },

    getTokenPrice: (req, res) => {
        if (req) {
            res.send(tokenPrice).status(200);
        } else {
            return tokenPrice
        }
    },

    //Character Endpoints
    getCharacterAchievements: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=achievements&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            req.app.get('db').wowcache.findOne({id: 1}).then(dbResponse => {
                
                let responseArr = [];

                response.data.achievements.achievementsCompleted.map((id, index) => {
                    let achievementObject = achievementInfo(dbResponse.body.data, id);
                    achievementObject.completedTimestamp = response.data.achievements.achievementsCompletedTimestamp[index];
                    achievementObject.criteria = response.data.achievements.criteria[index];
                    achievementObject.criteriaQuantity = response.data.achievements.criteriaQuantity[index];
                    achievementObject.criteriaTimestamp = response.data.achievements.criteriaTimestamp[index];
                    achievementObject.criteriaCreated = response.data.achievements.criteriaCreated[index];
                    responseArr.push(achievementObject);
                });

                let achievements = responseArr.reduce((r, a) => {
                    r[a.category] = r[a.category] || [];
                    r[a.category].push(a);
                    return r;
                }, Object.create(null));

                const achievementArray = (object) => {
                    let achievementSort = [];
                    for (let x in object) {
                        achievementSort.push({[x]: object[x]});
                    }
                    return achievementSort;
                }                

                res.status(200).send(achievementArray(achievements));

            }).catch(err => {
                console.log('DB WoW Get Classes Error');
                console.log(error);
                res.status(500).send('DB WoW Get Classes Error');
            });

        }).catch(error => {
            console.log('Get Character Achievements Error: ', error);
        });
    },

    getCharacterFeed: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=feed&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Feed Error: ', error);
        });
    },

    getCharacterHunterPets: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=hunterPets&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data.hunterPets);
        }).catch(error => {
            console.log('Get Character Hunter Pets Error: ', error);
        });
    },

    getCharacterItems: (req, res) => {
        axios.get(`https://us.api.blizzard.com/profile/wow/character/${req.params.realm}/${req.params.character}/equipment?namespace=profile-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            
            req.app.get('db').query(`select * from icons where id in (${createItemIconInClause(response.data.equipped_items)})`).then(iconRes => {

                response.data.equipped_items.forEach(obj => {
                    if (obj.item) {
                        obj.icon = iconRes.find(iconObj => { 
                            return iconObj.id === obj.item.id;
                        }).iconurl;
                    };

                    if (obj.quality) {
                        obj.quality.color = functions.qualityType(obj.quality.type);
                    };
                });

                res.status(200).send(response.data);

            }).catch(error => {
                console.log('DB Error! HALP', error.message);
                res.sendStatus(503);
            })

        }).catch(error => {
            console.log('Get Character Items Error: ', error);
        });
    },

    getCharacterMounts: (req, res) => {
        
        req.app.get('db').wowcache.findOne({id: 5}).then(dbResponse => {
            
            let masterMounts = {};
            masterMounts.mounts = dbResponse.body.data.mounts.filter(obj => obj.itemId > 0).sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();

                if (x < y) {return -1};
                if (x > y) {return 1};
                return 0;
            });
            
            axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=mounts&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
                
                masterMounts.numCollected = response.data.mounts.numCollected;
                masterMounts.numNotCollected = response.data.mounts.numNotCollected;

                response.data.mounts.collected.map(obj => {
                    masterMounts.mounts.map((masterObj, masterIndex) => {
                        masterMounts.mounts[masterIndex].qualityColor = functions.qualityColor(masterMounts.mounts[masterIndex].qualityId);
                        if (masterObj.itemId === obj.itemId && masterObj.creatureId === obj.creatureId) {
                            return masterMounts.mounts[masterIndex].collected = true;
                        };
                        if (!masterMounts.mounts[masterIndex].collected) {
                            return masterMounts.mounts[masterIndex].collected = false;
                        };
                    });
                });

                res.status(200).send(masterMounts);
            }).catch(error => {
                console.log('Get Character Mounts Error: ', error);
            });
        }).catch(err => {
            console.log('DB WoW Get Mounts Error');
            console.log(err);
            res.status(500).send('DB WoW Get Mounts Error');
        });

    },

    getCharacterPets: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=pets&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=petSlots&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(slotResponse => {
                req.app.get('db').wowcache.findOne({id: 6}).then(dbResponse => {
                    response.data.pets.collected.map((petsObj, petsIndex) => {
                        response.data.pets.collected[petsIndex].qualityColor = functions.qualityColor(petsObj.qualityId);
                        response.data.pets.collected[petsIndex].slot = 4;
                        response.data.pets.collected[petsIndex].abilities = [];

                        slotResponse.data.petSlots.map(slotsObj => {
                            if (petsObj.battlePetGuid === slotsObj.battlePetGuid) {
                                response.data.pets.collected[petsIndex].slot = slotsObj.slot;
                                response.data.pets.collected[petsIndex].abilities = slotsObj.abilities;
                            };
                        });

                        dbResponse.body.data.pets.map(masterPetsObj => {
                            if (masterPetsObj.creatureId === petsObj.creatureId) {
                                response.data.pets.collected[petsIndex].family = masterPetsObj.family;
                                response.data.pets.collected[petsIndex].typeId = masterPetsObj.typeId;
                                response.data.pets.collected[petsIndex].baseStats = masterPetsObj.stats;
                                response.data.pets.collected[petsIndex].strongAgainst = masterPetsObj.strongAgainst;
                                response.data.pets.collected[petsIndex].weakAgainst = masterPetsObj.weakAgainst;
                            }
                        });

                        if (response.data.pets.collected.length - 1 === petsIndex) {
                            res.status(200).send(response.data);
                        }
                    });
                    
                }).catch(err => {
                    console.log('DB WoW Get Pets Error');
                    console.log(error);
                    res.status(500).send('DB WoW Get Pets Error');
                });

            }).catch(error => {
                console.log('Get Character Pet Slots Error: ', error);
            });
                    
        }).catch(error => {
            console.log('Get Character Pets Error: ', error);
        });
    },

    getCharacterPetSlots: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=petSlots&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Pet Slots Error: ', error);
        });
    },

    getCharacterProfessions: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=professions&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Professions Error: ', error);
        });
    },

    getCharacterProgression: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=progression&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            
            req.app.get('db').wowcache.findOne({id: 3}).then(dbResponse => {

                response.data.progression.raids.forEach((obj, index) => {
                    obj.bosses.forEach(bossObj => {
                        bossObj.bossInfo = dbResponse.body.data.bosses.find(key => key.id === bossObj.id);
                    })

                    if (response.data.progression.raids.length - 1 === index) {
                        res.status(200).send(response.data);
                    }
                });
                
            }).catch(err => {
                console.log('DB WoW Character Progression Error');
                console.log(err);
                res.status(500).send('DB WoW Character Progression Error');
            });

        }).catch(error => {
            console.log('Get Character Professions Error: ', error);
        });
    },

    getCharacterPVP: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=pvp&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character PVP Error: ', error);
        });
    },

    getCharacterQuests: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=quests&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Quests Error: ', error);
        });
    },

    getCharacterReputation: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=reputation&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Reputation Error: ', error);
        });
    },

    getCharacterStatistics: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=statistics&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Statistics Error: ', error);
        });
    },

    getCharacterStats: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=stats&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Stats Error: ', error);
        });
    },

    getCharacterTalents: (req, res) => {
        axios.get(`https://us.api.blizzard.com/profile/wow/character/${req.params.realm}/${req.params.character}/specializations?namespace=profile-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {

            req.app.get('db').query(`select * from spellicons where id in (${createSpellIconInClause(response.data.specializations)})`).then(iconRes => {

                response.data.specializations.sort((a, b) => {
                    let x = a.specialization.name.toLowerCase();
                    let y = b.specialization.name.toLowerCase();
    
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
    
                    return 0;
                    
                });

                response.data.specializations.forEach(obj => {
                    if (obj.talents) {
                        obj.talents.forEach(talentObj => {
                            talentObj.spell_tooltip.iconurl = iconRes.find(iconObj => { 
                                return iconObj.id === talentObj.spell_tooltip.spell.id;
                            }).iconurl;
                        });
                    }

                    if (obj.pvp_talent_slots) {
                        obj.pvp_talent_slots.forEach(pvpObj => {
                            pvpObj.selected.spell_tooltip.iconurl = iconRes.find(iconObj => { 
                                return iconObj.id === pvpObj.selected.spell_tooltip.spell.id;
                            }).iconurl;
                        });
                    }
                });

                res.status(200).send(response.data);

            }).catch(error => {
                console.log('DB Error! HALP', error.message);
                res.sendStatus(503);
            })

        }).catch(error => {
            console.log('Get Character Talents Error: ', error);
        });
    },

    getCharacterTitles: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=titles&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Titles Error: ', error);
        });
    },

    //Guild Endpoints
    getGuildMembers: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/guild/${req.params.realm}/${req.params.guild}?fields=members&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Guild Members Error: ', error);
        });
    },

    getGuildNews: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/guild/${req.params.realm}/${req.params.guild}?fields=news&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Guild News Error: ', error);
        });
    },

    //Pet Endpoints
    getPetsAbilities: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/pet/ability/${req.params.abilityID}?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Pets Ability Error: ', error);
        });
    },

    getPetsSpecies: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/pet/species/${req.params.speciesId}?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Pets Species Error: ', error);
        });
    },

    getPetsStats: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/pet/stats/${req.params.speciesId}?level=${req.params.level}&breedId=${req.params.breedId}&qualityId=${req.params.qualityId}&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Pets Stats Error: ', error);
        });
    },

    //Quest Endpoint
    getQuest: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/quest/${req.params.questID}?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Quest by ID Error: ', error);
        });
    },

}