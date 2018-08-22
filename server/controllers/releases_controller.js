const app = require('../app');

module.exports = {
    get: (req, res) => {
        const db = app.get('db');
        const now = new Date().getTime();
    
        db.query(`select * from releases where release_date > ${now} order by release_date limit 5`).then(response => {
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(200).send(null);
            }
        }).catch(error => {
            console.log('Releases Query Error');
            console.log(error);
        });
    },

    getAll: (req, res) => {
        const db = app.get('db');
        const now = new Date().getTime();
    
        db.query(`select * from releases where release_date > ${now} order by release_date`).then(response => {
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(200).send(null);
            }
        }).catch(error => {
            console.log('Releases Query Error');
            console.log(error);
        });
    },
}