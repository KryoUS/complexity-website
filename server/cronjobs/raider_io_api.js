const axios = require('axios');
let raiderIOObj = {};

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
}