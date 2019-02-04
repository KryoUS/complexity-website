const blizzardApi = require('../controllers/blizzard_api_controller');
const raiderioApi = require('../controllers/raiderio_api_controller');
const wowprogressApi = require('../controllers/wowprogress_api_controller');

const CronJob = require('cron').CronJob;

const minutes =  {
    every5: () => new CronJob('00 */5 * * * *', () => {
        blizzardApi.setServerStatus();
    }, null, false, 'America/Denver').start(),

    every10: () => new CronJob('00 */10 * * * *', () => {
        raiderioApi.setWowMythicAffixes();
    }, null, false, 'America/Denver').start(),

    every30: () => new CronJob('00 */30 * * * *', () => {
        raiderioApi.setWowRankingsGuild();
        wowprogressApi.setWowProgressGuild();
    }, null, false, 'America/Denver').start(),
}

// const hours = {

// }

module.exports = {

    jobs: () => {
        minutes.every5();
        minutes.every10();
        minutes.every30();
    }

}