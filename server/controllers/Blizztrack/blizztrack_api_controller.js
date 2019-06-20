module.exports = {

    getWoWPatchNotes: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 10}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB Blizztrack Wow Patch Notes Error');
            console.log(error);
            res.status(500).send('DB Blizztrack Wow Patch Notes Error');
        });
    },

    getWoWVersion: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 11}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB Blizztrack Wow Version Error');
            console.log(error);
            res.status(500).send('DB Blizztrack Wow Version Error');
        });
    },

    getWoWLatestPosts: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 12}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB Blizztrack Wow Latest Posts Error');
            console.log(error);
            res.status(500).send('DB Blizztrack Wow Latest Posts Error');
        }); 
    },

    getWoWBluePosts: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 13}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB Blizztrack Wow Blue Posts Error');
            console.log(error);
            res.status(500).send('DB Blizztrack Wow Blue Posts Error');
        });
    },

}
