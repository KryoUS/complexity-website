const axios = require('axios').default;

module.exports = async () => {

    let token = '';
    await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    ).then(response => {
        token = response.data.access_token;

        //The following may no longer be necessary...
        process.env.TWITCH_TOKEN = response.data.access_token;
    }).catch(wowTokenFetchError => {
        //Logged at Interceptor
    });

    return token;
}