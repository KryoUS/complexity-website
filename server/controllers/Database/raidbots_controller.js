const functions = require('./tools/functions');

const createInClause = (arr) => {
    let itemIds = '';

    arr.map(obj => {
        for (let key in obj.body.simbot.meta.rawFormData.character.items) {
            if (obj.body.simbot.meta.rawFormData.character.items[key] && obj.body.simbot.meta.rawFormData.character.items[key].id) {
                itemIds += obj.body.simbot.meta.rawFormData.character.items[key].id + ','
            }
        }
    })

    return itemIds.replace(/.$/,'');
};

module.exports.raidbotsController = {
    getByCharName: (req, res) => {
        
        req.app.get('db').query(`
            select raidbots.*, characters.avatar_small, characters.spec_icon 
            from raidbots 
                inner join characters on characters.character_name = raidbots.body->'simbot'->'meta'->'rawFormData'->'character'->>'name'
                    AND characters.realm = raidbots.body->'simbot'->'meta'->'rawFormData'->'character'->>'realm'
            where body->'simbot'->>'player' = '${req.params.selectedCharName}' and body->'simbot'->'meta'->'rawFormData'->'armory'->>'realm' = '${req.params.selectedCharRealm}' 
        `).then(response => {

            req.app.get('db').query(`select * from icons where id in (${createInClause(response)})`).then(iconRes => {

                response.forEach(obj => {
                    for (let key in obj.body.simbot.meta.rawFormData.character.items) {
                        if (obj.body.simbot.meta.rawFormData.character.items[key] && obj.body.simbot.meta.rawFormData.character.items[key].id) {
                            obj.body.simbot.meta.rawFormData.character.items[key].icon = iconRes.find(iconObj => { 
                                return iconObj.id === obj.body.simbot.meta.rawFormData.character.items[key].id 
                            }).iconurl;
                        }
                    }
                });

                res.status(200).send(response);

            }).catch(error => {
                console.log(error)
                res.sendStatus(503);
            })
        }).catch(error => {
            console.log(error)
            res.sendStatus(503);
        })
    },
}