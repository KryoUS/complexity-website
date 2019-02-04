const axios = require('axios');
let raiderIOObj = {};
let raiderIOAffixes = {};

module.exports = {
    setWowRankingsGuild: (req, res) => {
        axios.get(`https://raider.io/api/v1/guilds/profile?region=us&realm=Thunderlord&name=complexity&fields=raid_progression%2Craid_rankings`).then(response => {
            raiderIOObj = response.data;
        }).catch(raiderIOError => {
            console.log('Raider IO Get Error', raiderIOError);
        });
    },

    getWowRankingsGuild: (req, res) => {
            res.send(raiderIOObj).status(200);
    },

    setWowMythicAffixes: (req, res) => {
        axios.get('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en').then(response => {
            raiderIOAffixes = response.data;
        }).catch(raiderIOAffixError => {
            console.log('Raider IO Affix Get Error', raiderIOAffixError);
        });
    },

    getWowMythicAffixes: (req, res) => {
            res.send(raiderIOAffixes).status(200);
    },
}