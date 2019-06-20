module.exports = {

    getWowProgressGuild: (req, res) => {
        req.app.get('db').wowcache.findOne({id: 16}).then(response => {
            res.status(200).send(response.body.data);
        }).catch(err => {
            console.log('DB WoWProgress Guild Score Error');
            console.log(error);
            res.status(500).send('DB WoWProgress Guild Score Error');
        });
    },
}