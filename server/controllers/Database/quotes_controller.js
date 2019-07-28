const app = require('../../app');

const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    get: (req, res) => {

        return app.get('db').quotes.find().then(response => {
            let random = getRandomArbitrary(0, response.length - 1);

            if (req) {
                res.status(200).send(response[random]);
            } else {
                return response[random];
            }
        }).catch(error => {
            console.log(error);

            if (req) {
                res.sendStatus(503);
            } else {
                return 503;
            }
        })
    },

    post: (req, res) => {

        let now = new Date().getTime();

        req.app.get('db').quotes.insert({ date_time: now, quote: req.body.quote, said_by: req.body.saidBy, entered_by: req.session.passport.user.id }).then(response => {
            res.sendStatus(200);
        }).catch(postError => {
            console.log('Release Post DB Error');
            console.log(postError);
            res.sendStatus(500);
        })
    },
}