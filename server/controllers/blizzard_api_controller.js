const axios = require('axios');

//Realm Status
let realmObj = {};
//Master Mount List
let mountsArr = [];
//Master Pet List
let petsArr = [];
//Master Race List
let racesArr = [];
//Master Classes List
let classesArr = [];
//Pet Types List
let petTypesArr = [];
//US WoW Token Price
let tokenPrice = {price: 0};

module.exports = {
    setBlizzardToken: () => {
        axios.post(`https://us.battle.net/oauth/token`, 'grant_type=client_credentials', {
            auth: {
                username: process.env.BLIZZ_API_CLIENT_ID, 
                password: process.env.BLIZZ_API_CLIENT_SECRET
            }
        }).then(response => {
            process.env.BLIZZ_API_TOKEN = response.data.access_token;
            module.exports.setServerStatus();
            module.exports.setMounts();
            module.exports.setPets();
            module.exports.setClasses();
            module.exports.setPetTypes();
            module.exports.setRaces();
            module.exports.setTokenPrice();
        }).catch(wowTokenFetchError => {
            console.log('WoW API Token Fetch Error: ', wowTokenFetchError);
        });
    },

    setServerStatus: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/realm/status?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            console.log('Server Status Set!');
            realmObj = response.data.realms.find(obj => {
                return obj.name === 'Thunderlord';
            });
        }).catch(serverStatusError => {
            console.log('Server Status Error: ?', serverStatusError);
        });
    },
    
    getServerStatus: (req, res) => {
        res.status(200).send(realmObj);
    },

    getCharacterAchievements: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=achievements&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Achivements Error: ', error);
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
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Hunter Pets Error: ', error);
        });
    },

    getCharacterItems: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=items&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Items Error: ', error);
        });
    },

    getCharacterMounts: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=mounts&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Character Mounts Error: ', error);
        });
    },

    getCharacterPets: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=pets&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
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
        axios.get(`https://us.api.blizzard.com/wow/character/${req.params.realm}/${req.params.character}?fields=talents&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
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

    setMounts: () => {
        axios.get(`https://us.api.blizzard.com/wow/mount/?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            console.log('Master Mount List Set!');
            mountsArr = JSON.parse(JSON.stringify(response.data.mounts));
        }).catch(error => {
            console.log('Set Master Mounts List Error: ', error);
        });
    },

    getMounts: (req, res) => {
        res.status(200).send(mountsArr);
    },

    setPets: () => {
        axios.get(`https://us.api.blizzard.com/wow/pet/?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            console.log('Master Pet List Set!');
            petsArr = JSON.parse(JSON.stringify(response.data.pets));
        }).catch(error => {
            console.log('Set Master Pets List Error: ', error);
        });
    },

    getPets: (req, res) => {
        res.status(200).send(petsArr);
    },

    setPetTypes: () => {
        axios.get(`https://us.api.blizzard.com/wow/data/pet/types?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            console.log('Master Pet Types List Set!');
            petTypesArr = JSON.parse(JSON.stringify(response.data.petTypes));
        }).catch(error => {
            console.log('Get Pet Types Error: ', error);
        });
    },

    getPetTypes: (req, res) => {
        res.status(200).send(petTypesArr);
    },

    getPetsAbilities: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/pet/ability/${req.params.abilityID}?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Pets Ability Error: ', error);
        });
    },

    getPetsSpecies: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/pet/species/${req.params.speciesID}?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Pets Species Error: ', error);
        });
    },

    getPetsStats: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/pet/stats/${req.params.speciesID}?level=${req.params.level}&breedId=${req.params.breedID}&qualityId=${req.params.qualityID}&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Pets Stats Error: ', error);
        });
    },

    getQuest: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/quest/${req.params.questID}?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('Get Quest by ID Error: ', error);
        });
    },

    setRaces: () => {
        axios.get(`https://us.api.blizzard.com/wow/data/character/races?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            console.log('Master Races List Set!');
            racesArr = JSON.parse(JSON.stringify(response.data.races));
        }).catch(error => {
            console.log('Get Races Error: ', error);
        });
    },

    getRaces: (req, res) => {
        res.status(200).send(racesArr);
    },

    setClasses: () => {
        axios.get(`https://us.api.blizzard.com/wow/data/character/classes?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            console.log('Master Classes List Set!');
            classesArr = JSON.parse(JSON.stringify(response.data.classes));
        }).catch(error => {
            console.log('Get Classes Error: ', error);
        });
    },

    getClasses: (req, res) => {
        res.status(200).send(classesArr);
    },

    setTokenPrice: () => {
        axios.get(`https://us.api.blizzard.com/data/wow/token/index?namespace=dynamic-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            console.log('US Token Price Set!');
            tokenPrice.price = response.data.price;
        }).catch(error => {
            console.log('Get Token Price Error: ', error);
        });
    },

    getTokenPrice: (req, res) => {
        res.send(tokenPrice).status(200);
    },

}