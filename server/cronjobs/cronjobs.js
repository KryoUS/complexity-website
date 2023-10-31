//Controllers
const { blizzardController } = require('../controllers/blizzard_api_controller');
const { breakingNewsController } = require('../controllers/Database/breaking_news_controller');
const { wowNewsController } = require('../controllers/Warcraft/news_controller');

//DB
const bnetLogCleanup = require('../controllers/Database/logging/bnetLogging').cleanup;
const twitchLogCleanup = require('../controllers/Database/logging/twitchLogging').cleanup;
const wowheadLogCleanup = require('../controllers/Database/logging/wowheadLogging').cleanup;
const characterCleanup = require('../controllers/Warcraft/Character/get/removeChar');

//Cron Library https://www.npmjs.com/package/cron
const CronJob = require('cron').CronJob;

//Tasks
const getAllCharacters = require('../controllers/Warcraft/Character/get/all');

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
            characterCleanup();
            bnetLogCleanup();
            twitchLogCleanup();
            wowheadLogCleanup();
            getAllCharacters();
    }, null, false, 'America/Denver'),
}

//Export cron jobs so server starts them
module.exports.jobs = () => {
    blizzardController.setServerStatus();
    blizzardController.setTokenPrice();
    wowNewsController.setWowheadNews();
    blizzardController.setBluePosts();
    breakingNewsController.breakingNews();
    minutes.every1().start();
    minutes.every5().start();
    minutes.every15().start();
    hours.every1().start();
}