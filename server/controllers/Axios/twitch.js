const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const twitchLimit = require('axios-rate-limit');
const getToken = require('../Twitch/token');
const twitchLogging = require('../Database/logging/twitchLogging').twitchLogging;

const twitch = twitchLimit(axios.create({
    baseURL: 'https://api.twitch.tv',
    timeout: 10000
}), { maxRequests: 10, perMilliseconds: 1000, maxRPS: 10 });

axiosRetry(twitch, { retries: 3 });

twitch.interceptors.request.use(async function (config) {

    if (!twitch.defaults.headers.common.Authorization) {
        const access_token = await getToken();
        twitch.defaults.headers.common['Client-ID'] = process.env.TWITCH_CLIENT_ID;
        twitch.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        twitch.defaults.headers.common['Content-Type'] = `application/json`;
    }

    twitchLogging(null, null, config.method, config.baseURL, config.url, null);
    return config;
}, function (error) {
    // Do something with request error
    twitchLogging(null, null, error.config.method, error.config.baseURL, error.config.url, null);
    return Promise.reject(error);
});

twitch.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    twitchLogging(response.status, response.statusText, response.config.method, response.config.baseURL, response.config.url, null);
    return response;
}, async function (error) {

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        twitchLogging(error.response.status, error.response.statusText, error.response.config.method, error.response.config.baseURL, error.response.config.url, null);
        const config = error.config;
        if (error.response.status === 401 && !config.sent) {
            config.sent = true;
            const access_token = await getToken();
            twitch.defaults.headers.common['Client-ID'] = process.env.TWITCH_CLIENT_ID;
            twitch.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            twitch.defaults.headers.common['Content-Type'] = `application/json`;
            return twitch(config);
        }
        // console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        twitchLogging(null, null, error.request.config.method, error.request.config.baseURL, error.request.config.url, null);
    } else {
        // Something happened in setting up the request that triggered an Error
        twitchLogging(null, null, null, null, null, error.message);
    }

    return Promise.reject(error);

});

module.exports = twitch;