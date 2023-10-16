const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const wowheadLimit = require('axios-rate-limit');
const wowheadLogging = require('../Database/logging/wowheadLogging').wowheadLogging;

const wowhead = wowheadLimit(axios.create({
  baseURL: 'https://www.wowhead.com',
  timeout: 10000
}), { maxRequests: 10, perMilliseconds: 1000, maxRPS: 10 });

axiosRetry(wowhead, { retries: 3 });

wowhead.interceptors.request.use(async function (config) {
  wowheadLogging(null, null, config.method, config.baseURL, config.url, null);
  return config;
}, function (error) {
  // Do something with request error
  wowheadLogging(null, null, error.config.method, error.config.baseURL, error.config.url, null);
  return Promise.reject(error);
});

wowhead.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  wowheadLogging(response.status, response.statusText, response.config.method, response.config.baseURL, response.config.url, null);
  return response;
}, async function (error) {

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    wowheadLogging(error.response.status, error.response.statusText, error.response.config.method, error.response.config.baseURL, error.response.config.url, null);
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('Axios Wowhead Interceptor Request without a Response ----> ', error.request.config);
    wowheadLogging(null, null, error.request.config.method, error.request.config.baseURL, error.request.config.url, null);
  } else {
    // Something happened in setting up the request that triggered an Error
    wowheadLogging(null, null, null, null, null, error.message);
  }

  return Promise.reject(error);

});

module.exports = wowhead;