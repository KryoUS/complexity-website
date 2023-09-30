const { app } = require('../../../app');

module.exports = {
    twitchLogging: async (status, statusText, method, baseurl, url, message) => {
        let db = await app.get('db');

        db.twitchlog.insert({
            status: status,
            statustext: statusText,
            method: method,
            baseurl: baseurl,
            url: url,
            message: message
        }).then(result => {
            //Do nothing with results
        }).catch(error => {
            console.log(`${new Date()} ===Massive.js DB Twitch Log Insert Error===`, error);
        })
    },

    twitchLoggingCleanup: async () => {
        let db = await app.get('db');

        db.query("DELETE FROM twitchlog WHERE created_at < NOW() - INTERVAL '15 days'").catch(dbError => {
            console.log(`${new Date()} ===Massive.js DB Twitch Log Cleanup Error===`, dbError);
        });
    }
}
