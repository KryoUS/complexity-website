const axios = require('axios');
let wowProgressObj = {};

module.exports = {
    setWowProgressGuild: (req, res) => {
        axios.get(`https://www.wowprogress.com/guild/us/thunderlord/Complexity/json_rank`).then(response => {
            wowProgressObj = response.data;
        }).catch(wowProgressError => {
            console.log('Wow Progress Get Error', wowProgressError);
        });
    },

    getWowProgressGuild: (req, res) => {
        res.send(wowProgressObj).status(200);
    },
}