//Controllers
const { blizzardController } = require('../controllers/blizzard_api_controller');
const { twitchController } = require('../controllers/twitch_api_controller');
const { breakingNewsController } = require('../controllers/Database/breaking_news_controller');
const { wowNewsController } = require('../controllers/Warcraft/news_controller');

//Cron Library https://www.npmjs.com/package/cron
const CronJob = require('cron').CronJob;

//Every x minutes
const minutes =  {
    
    every1: () => new CronJob('00 */1 * * * *', () => {
        blizzardController.setServerStatus();
    }, null, false, 'America/Denver'),
    
    every5: () => new CronJob('00 */5 * * * *', () => {
        blizzardController.setTokenPrice();
        blizzardController.setBluePosts();
        wowNewsController.setWowheadNews();
    }, null, false, 'America/Denver'),

    every15: () => new CronJob('00 */15 * * * *', () => {
        breakingNewsController.breakingNews();
    }, null, false, 'America/Denver'),
}

// Every x hours
const hours = {
    every1: () => new CronJob('00 0 */1 * * *', () => {

    }, null, false, 'America/Denver'),
}

//Export cron jobs so server starts them
module.exports.jobs = () => {
    wowNewsController.setWowheadNews();
    blizzardController.setBluePosts();
    minutes.every1().start();
    minutes.every5().start();
    minutes.every15().start();
    // hours.every1().start();
}