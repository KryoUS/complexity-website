/*

Returns the status and a unique ID for a character. 
A client should delete information about a character from their application if any of the following conditions occur:

- an HTTP 404 Not Found error is returned
- the is_valid value is false
- the returned character ID doesn't match the previously recorded value for the character

The following example illustrates how to use this endpoint:
1. A client requests and stores information about a character, including its unique character ID and the timestamp of the request.
2. After 30 days, the client makes a request to the status endpoint to verify if the character information is still valid.
3. If character cannot be found, is not valid, or the characters IDs do not match, the client removes the information from their application.
4. If the character is valid and the character IDs match, the client retains the data for another 30 days.

https://develop.battle.net/documentation/world-of-warcraft/profile-apis

*/
const { app } = require('../../../../app');
const guildChars = require('../../Guild/guild_characters');
const charStatus = require('../status');
const charEndpoints = require('./charEndpoints');

module.exports = async () => {

    const db = await app.get('db');

    //Get Guild Characters
    //Level Restriction Check
    guildChars('thunderlord', 'complexity').then(charObj => {
        charObj.map(obj => {
            const char = obj.character;
            if (char.level === 80) {
                // charAuth(db, encodeURI(obj.character.name.toLowerCase()), encodeURI(obj.character.realm.slug));
                //Check Character Status
                charStatus(encodeURI(char.name.toLowerCase()), encodeURI(char.realm.slug)).then(charStatus => {
                    const status = charStatus;
                    //Save to DB if we have an ID and is valid
                    if (status?.id && status?.is_valid) {
                        //Continue Character Storage...
                        //Check for existing id 
                        db.characters.findDoc(status.id).then(data => {
                            if (data) {
                                db.characters.update(status.id, { is_valid: status.is_valid }).then(() => {
                                    //Run gauntlet
                                    charEndpoints(db, status.id, encodeURI(char.name.toLowerCase()), encodeURI(char.realm.slug));
                                }).catch(error => {
                                    //TODO: DB Errors go...?
                                });
                            } else {
                                db.characters.insert({ id: status.id, is_valid: status.is_valid }).then(() => {
                                    //Run gauntlet
                                    charEndpoints(db, status.id, encodeURI(char.name.toLowerCase()), encodeURI(char.realm.slug));
                                }).catch(error => {
                                    //TODO: DB Errors go...?
                                });
                            }
                        }).catch(error => {
                            //TODO: DB Errors go...?
                        });
                    };
                }).catch({

                });
            };
        })
    });

}
