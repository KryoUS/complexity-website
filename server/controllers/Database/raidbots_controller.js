const functions = require('./tools/functions');

module.exports = {
    getByCharName: (req, res) => {
        
        req.app.get('db').query(`select * from raidbots where body->'simbot'->>'player' = '${req.params.selectedCharName}' and body->'simbot'->'meta'->'rawFormData'->'armory'->>'realm' = '${req.params.selectedCharRealm}' `).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log(error)
            res.sendStatus(503);
        })
    },
}