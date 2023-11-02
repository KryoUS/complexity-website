const { app } = require('../../../../app');
const { dbLogging } = require('../../logging/database');

module.exports.dbCharacters = {
    getAll: (req, res) => {
        app.get('db').characters.find({}, {fields: ["id", "summary", "media", "character_statistics"]}).then(findRes => {
            res.status(200).send(findRes);
        }).catch(charGetAllError => {
            dbLogging.toConsole(charGetAllError);
            res.status(500).send('Cannot retrieve Characters at this time.');
        });
    }
}