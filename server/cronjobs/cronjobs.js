//Controllers
const blizzardApi = require('../controllers/blizzard_api_controller');
const twitchAPI = require('../controllers/twitch_api_controller');

//Cron Library https://www.npmjs.com/package/cron
const CronJob = require('cron').CronJob;

//Every x minutes
const minutes =  {
    every5: () => new CronJob('00 */5 * * * *', () => {
        console.log("blizz cron running")
        blizzardApi.setServerStatus();
        blizzardApi.setTokenPrice();
    }, null, false, 'America/Denver'),
}

// Every x hours
const hours = {
    every: () => new CronJob('00 0 */1 * * *', () => {
        blizzardApi.setBlizzardToken();
        twitchAPI.setTwitchToken();
    }, null, false, 'America/Denver', hours.every, true),
}

//Export cron jobs so server starts them
module.exports = {

    jobs: () => {
        minutes.every5();
        hours.every();
    }

}