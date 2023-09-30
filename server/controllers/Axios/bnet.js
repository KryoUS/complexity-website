const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const bnetLimit = require('axios-rate-limit');
const getToken = require('../Blizzard/token');
const bnetLogging = require('../Database/logging/bnetLogging').bnetLogging;

const bnet = bnetLimit(axios.create({
  baseURL: 'https://us.api.blizzard.com',
  timeout: 10000
}), { maxRequests: 10, perMilliseconds: 1000, maxRPS: 10 });

axiosRetry(bnet, { retries: 3 });

bnet.interceptors.request.use(async function (config) {

  if (!bnet.defaults.headers.common.Authorization) {
    const access_token = await getToken();
    bnet.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  }

  // console.log("Interceptor Req: ", null, null, config.method, config.baseURL, config.url);
  return config;
}, function (error) {
  // Do something with request error
  bnetLogging(null, null, error.config.method, error.config.baseURL, error.config.url, null);
  return Promise.reject(error);
});

bnet.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log("Interceptor Res: ", response.status, response.statusText, response.config.method, response.config.baseURL, response.config.url);
  return response;
}, async function (error) {

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    bnetLogging(error.response.status, error.response.statusText, error.response.config.method, error.response.config.baseURL, error.response.config.url, null);
    const config = error.config;
    if (error.response.status === 401 && !config.sent) {
      config.sent = true;
      const access_token = await getToken();
      bnet.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return bnet(config);
    }
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    bnetLogging(null, null, error.request.config.method, error.request.config.baseURL, error.request.config.url, null);
  } else {
    // Something happened in setting up the request that triggered an Error
    bnetLogging(null, null, null, null, null, error.message);
  }

  return Promise.reject(error);

});

module.exports = bnet;