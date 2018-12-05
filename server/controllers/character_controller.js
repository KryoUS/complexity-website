const app = require('../app');
const axios = require('axios');

module.exports = {
    feedAndItems: (req, res) => {
        const { name, realm } = req.params;
    
        axios.get(`https://us.api.blizzard.com/wow/character/${realm}/${name}?fields=feed%2Citems&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(response => {
            res.status(200).send(response.data);
        }).catch(error => {
            console.log('WoW Character Items API Error');
            console.log(error);
            res.status(500).send('WoW Character API Error');
        });
    },
}