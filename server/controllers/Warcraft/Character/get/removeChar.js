const { app } = require('../../../../app');

module.exports = async () => {

    let db = await app.get('db');

    db.query("DELETE FROM characters WHERE updated_at < NOW() - INTERVAL '1 days'").catch(error => {
        console.log(`${new Date()} ===Massive.js DB Bnet Log Cleanup Error===`, error);
    });
}
