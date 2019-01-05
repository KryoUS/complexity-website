const app = require('../app');

module.exports = {
    get: (req, res) => {
        const db = app.get('db');
    
        db.query('select character_name, level, race, class, realm, avatar_med, avatar_large, spec_icon, spec_desc from characters where raider = 1').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('Raider DB Error');
            console.log(error);
            res.status(500).send('Raider DB Call Error');
        })
    },
}