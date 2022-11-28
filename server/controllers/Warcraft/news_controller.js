const axios = require('axios');
const xml2JSON = require('xml2js').parseString;

//Retail WoW News from Wowhead
let wowRetailNews = [];

module.exports.wowNewsController = {
    setWowheadNews: () => {
        axios.get('https://www.wowhead.com/news/rss/retail').then(response => {
            xml2JSON(response.data, function (err, result) {
                wowRetailNews = result.rss.channel[0].item;
            });
        }).catch(wowNewsFetchError => {
            console.log('WoW News Fetch Error: ', wowNewsFetchError);
        });
    },

    getWowheadNews: (req, res) => {
        res.status(200).send(wowRetailNews);
    },

};