
const classColors = {
    'Death Knight': '#c41e3b',
    'Demon Hunter': '#a330c9',
    'Druid': '#ff7c0a',
    'Hunter': '#aad372',
    'Mage': '#68ccef',
    'Monk': '#00ffba',
    'Paladin': '#f48cba',
    'Priest': '#f0ebe0',
    'Rogue': '#fff468',
    'Shaman': '#2359ff',
    'Warlock': '#9382c9',
    'Warrior': '#c69b6d'
}

module.exports = {
    all: (req, res, next) => {

        req.app.get('db').query(`select * from characters`).then(response => {
            req.app.get('db').wowcache.findDoc(4).then(classesRes => {
                req.app.get('db').wowcache.findDoc(8).then(racesRes => {
                    response.forEach((obj, index) => {
                        
                        for (let i = 0;i<classesRes.data.classes.length;i++) {
                            if (classesRes.data.classes[i].id === obj.class) {
                                obj.className = classesRes.data.classes[i].name;
                                obj.classColor = classColors[classesRes.data.classes[i].name];
                            }
                        }

                        for (let i = 0;i<racesRes.data.races.length;i++) {
                            if (racesRes.data.races[i].id === obj.race) {
                                obj.raceName = racesRes.data.races[i].name;
                            }
                        }
    
                        if (index === response.length - 1) {
                            res.status(200).send(response);
                        }
                    })
                })
            })
        }).catch(error => {
            console.log('DB Member Character Error');
            console.log(error);
            res.status(500).send('DB Member Character Error');
        });
    },
}