const axios = require('axios');
const blizzardCrons = require('../cronjobs/blizzardapi');

const getBlizzardToken = () => {
    axios.post(`https://us.battle.net/oauth/token`, 'grant_type=client_credentials', {
        auth: {
            username: process.env.BLIZZ_API_CLIENT_ID, 
            password: process.env.BLIZZ_API_CLIENT_SECRET
        }
    }).then(response => {
        process.env.BLIZZ_API_TOKEN = response.data.access_token;
        blizzardCrons.setServerStatus();
    }).catch(wowTokenFetchError => {
        console.log('WoW API Token Fetch Error: ', wowTokenFetchError);
    });
};

module.exports = {
    setBlizzardToken: (req, res) => {
        getBlizzardToken();
    },
}