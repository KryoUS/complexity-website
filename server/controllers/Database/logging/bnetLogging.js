const { app } = require('../../../app');

module.exports = {
    bnetLogging: async (status, statusText, method, baseurl, url, message) => {
        let db = await app.get('db');

        db.bnetlog.insert({
            status: status,
            statustext: statusText,
            method: method,
            baseurl: baseurl,
            url: url,
            message: message
        }).then(result => {
            //Do nothing with results
        }).catch(error => {
            console.log(`${new Date()} ===Massive.js DB Bnet Log Insert Error===`, error);
        })
    },

    cleanup: async () => {
        let db = await app.get('db');

        db.query("DELETE FROM bnetlog WHERE created_at < NOW() - INTERVAL '10 days'").catch(dbError => {
            console.log(`${new Date()} ===Massive.js DB Bnet Log Cleanup Error===`, dbError);
        });
    }
}
