const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    get: (req, res) => {

        req.app.get('db').quotes.find().then(response => {
            let random = getRandomArbitrary(0, response.length - 1);
            res.status(200).send(response[random]);
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