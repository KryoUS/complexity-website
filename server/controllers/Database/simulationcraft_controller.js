const classColors = {
    'Death Knight': '#c41e3b',
    'deathknight': '#c41e3b',
    'Demon Hunter': '#a330c9',
    'demonhunter': '#a330c9',
    'Druid': '#ff7c0a',
    'druid': '#ff7c0a',
    'Hunter': '#aad372',
    'hunter': '#aad372',
    'Mage': '#68ccef',
    'mage': '#68ccef',
    'Monk': '#00ffba',
    'monk': '#00ffba',
    'Paladin': '#f48cba',
    'paladin': '#f48cba',
    'Priest': '#f0ebe0',
    'priest': '#f0ebe0',
    'Rogue': '#fff468',
    'rogue': '#fff468',
    'Shaman': '#2359ff',
    'shaman': '#2359ff',
    'Warlock': '#9382c9',
    'warlock': '#9382c9',
    'Warrior': '#c69b6d',
    'warrior': '#c69b6d'
}

module.exports.simulationcraftController = {
    get: (req, res) => {
        
        req.app.get('db').wowcache.findOne({id: 9}).then(response => {

            response.body.currentTier.forEach(obj => {
                obj.classColor = classColors[obj.class];
            });

            response.body.publicRealm.forEach(obj => {
                obj.classColor = classColors[obj.class];
            });

            res.status(200).send(response.body);
        }).catch(err => {
            console.log('DB SimulationCraft Error');
            console.log(error);
            res.status(500).send('DB SimulationCraft Error');
        });
    },
}