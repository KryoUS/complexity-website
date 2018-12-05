const axios = require('axios');
let realmObj = {};

module.exports = {
    setServerStatus: (req, res) => {
        axios.get(`https://us.api.blizzard.com/wow/realm/status?locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            realmObj = response.data.realms.find(obj => {
                return obj.name === 'Thunderlord';
            });
        }).catch(serverStatusError => {
            console.log('Server Status Error: ?', serverStatusError);
        });
    },
    
    getServerStatus: (req, res) => {
        res.send(realmObj).status(200);
    },

}