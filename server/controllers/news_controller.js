const app = require('../app');

module.exports = {
    get: (req, res) => {
        const db = app.get('db');
        db.query('select * from news order by news_datetime desc limit 20').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log(error)
            res.sendStatus(503);
        })
    },

    getGuildNews: (req, res) => {
        let newsFeed = {};
    
        axios.get(`https://us.api.battle.net/wow/guild/Thunderlord/Complexity?fields=news&locale=en_US&apikey=${process.env.APIKEY}`).then(newsRes => {
            
            newsFeed.lastModified = newsRes.data.lastModified;
            newsFeed.news = newsRes.data.news;
            res.status(200).send(newsFeed);
    
        }).catch(error => {
            console.log('WoW API Error');
            console.log(error);
        })
    }
}