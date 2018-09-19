const axios = require('axios');
let realmObj = {};

module.exports = {
    setServerStatus: (req, res) => {
        axios.get(`https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=${process.env.APIKEY}`).then(response => {
            realmObj = response.data.realms.find(obj => {
                return obj.name === 'Thunderlord';
            });
        }).catch(serverStatusError => {
            console.log('Server Status Error');
        });
    },

    getServerStatus: (req, res) => {
        res.send(realmObj).status(200);
    }
}