module.exports.raiderIOController = {

    getWowRankingsGuild: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 14}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB RaiderIO Wow Guild Rank Error');
            console.log(error);
            res.status(500).send('DB RaiderIO Wow Guild Rank Error');
        });
    },

    getWowMythicAffixes: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 15}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB RaiderIO Wow Mythic Affixes Error');
            console.log(error);
            res.status(500).send('DB RaiderIO Wow Mythic Affixes Error');
        });
    },
}
