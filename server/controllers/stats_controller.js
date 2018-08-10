const app = require('../app');

module.exports = {
    characterStats: (req, res, next) => {
        const db = app.get('db');

        db.query(`select level, character_name, realm, stat_exhaulted_reps, stat_need_rolls, stat_greed_rolls, stat_mounts, stat_epics from characters order by stat_exhaulted_reps desc;`).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DB Character Stats Error');
            console.log(error);
            res.status(500).send('DB Characters Stats Error');
        });
    }
}