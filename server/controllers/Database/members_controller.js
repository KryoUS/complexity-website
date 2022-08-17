const tools = require('./tools/functions');

module.exports.memberController = {
    all: (req, res, next) => {

        req.app.get('db').query(`select * from characters`).then(response => {
            req.app.get('db').wowcache.findDoc(4).then(classesRes => {
                req.app.get('db').wowcache.findDoc(8).then(racesRes => {
                    response.forEach((obj, index) => {

                        for (let i = 0; i < classesRes.data.classes.length; i++) {
                            if (classesRes.data.classes[i].id === obj.class) {
                                obj.className = classesRes.data.classes[i].name;
                                obj.classColor = tools.getClassColor(classesRes.data.classes[i].name);
                            }
                        }

                        for (let i = 0; i < racesRes.data.races.length; i++) {
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

    specsOnly: (req, res, next) => {

        req.app.get('db').query(`select distinct class, spec_name, spec_icon, spec_role from characters where spec_name IS NOT NULL`).then(response => {
            req.app.get('db').wowcache.findDoc(4).then(classesRes => {
                response.forEach((obj, index) => {

                    for (let i = 0; i < classesRes.data.classes.length; i++) {
                        if (classesRes.data.classes[i].id === obj.class) {
                            obj.className = classesRes.data.classes[i].name;
                            obj.classColor = tools.getClassColor(classesRes.data.classes[i].name);
                        }
                    }

                    if (index === response.length - 1) {
                        res.status(200).send(response);
                    }
                })
            })
        }).catch(error => {
            console.log('DB Member Specs Error');
            console.log(error);
            res.status(500).send('DB Member Specs Error');
        });
    },
}