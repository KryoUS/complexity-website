module.exports = {
    getDiscordBot: (req, res) => {
    
        req.app.get('db').query('select * from discordbotlog').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('DiscordBotLog Error');
            console.log(error);
            res.status(500).send('DiscordBotLog Error');
        })
    },
}