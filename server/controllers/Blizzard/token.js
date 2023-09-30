const axios = require('axios').default;

module.exports = async () => {

    let token = '';
    await axios.post(`https://us.battle.net/oauth/token`, 'grant_type=client_credentials', {
        auth: {
            username: process.env.BLIZZ_API_CLIENT_ID,
            password: process.env.BLIZZ_API_CLIENT_SECRET
        }
    }).then(response => {
        token = response.data.access_token;

        //The following may no longer be necessary...
        process.env.BLIZZ_TOKEN = response.data.access_token;
    }).catch(wowTokenFetchError => {
        //Logged at Interceptor
    });

    return token;
}
