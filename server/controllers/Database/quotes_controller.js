const axios = require('axios');

module.exports = {
    get: (req, res) => {
        let randomQuoteId = Math.random() * (max - min) + min;
        
        req.app.get('db').quotes.findOne({ id: randomQuoteId }).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log(error)
            res.sendStatus(503);
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