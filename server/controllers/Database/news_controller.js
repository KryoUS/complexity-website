const axios = require('axios');

module.exports = {
    get: (req, res) => {
        
        req.app.get('db').query('select * from news order by news_datetime desc limit 20').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log(error)
            res.sendStatus(503);
        })
    },

    getGuildNews: (req, res) => {
        let newsFeed = {};
    
        axios.get(`https://us.api.blizzard.com/wow/guild/Thunderlord/Complexity?fields=news&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(newsRes => {
            
            newsFeed.lastModified = newsRes.data.lastModified;
            newsFeed.news = newsRes.data.news;
            res.status(200).send(newsFeed);
    
        }).catch(error => {
            console.log('WoW API Error');
            console.log(error);
        })
    },

    getAlert: (req, res) => {
        
        req.app.get('db').query('select * from breakingnews order by id desc').then(response => {
            
            for (i=0; i<response.length; i++)
            {
                response[i].alert = response[i].alert.replace(/\s?(<br\s?\/?>)\s?/g, ' ');
            }           

            res.status(200).send(response);
        }).catch(error => {
            console.log(error)
            res.sendStatus(503);
        })
    },
}