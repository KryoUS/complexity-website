const { app } = require('../../../app');

module.exports = {
    wowheadLogging: async (status, statusText, method, baseurl, url, message) => {
        let db = await app.get('db');

        db.wowheadlog.insert({
            status: status,
            statustext: statusText,
            method: method,
            baseurl: baseurl,
            url: url,
            message: message
        }).then(result => {
            //Do nothing with results
        }).catch(error => {
            console.log(`${new Date()} ===Massive.js DB Wowhead Log Insert Error===`, error);
        })
    },

    wowheadLoggingCleanup: async () => {
        let db = await app.get('db');

        db.query("DELETE FROM wowheadlog WHERE created_at < NOW() - INTERVAL '15 days'").catch(dbError => {
            console.log(`${new Date()} ===Massive.js DB Wowhead Log Cleanup Error===`, dbError);
        });
    }
}
