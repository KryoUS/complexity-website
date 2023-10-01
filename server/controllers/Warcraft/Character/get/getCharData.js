const bnet = require('../../../Axios/bnet');

module.exports = (db, id, characterName, realmSlug, endpoint, endpointSlug) => bnet.get(`/profile/wow/character/${realmSlug}/${characterName}${endpoint}?namespace=profile-us&locale=en_US`).then(res => {

    db.characters.update(id, {[endpointSlug]: res.data}).then(dbRes => {
        //TODO: DB Logs go...?
    }).catch(error => {
        //TODO: DB Errors go...?
    });

}).catch(error => {
    
});