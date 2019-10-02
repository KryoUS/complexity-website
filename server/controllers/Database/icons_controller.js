// const app = require('../../app');
const axios = require('axios');

module.exports = {
    getItemIcons: (req, res) => {

        req.app.get('db').query('select id from icons').then(response => {
            
            let count = 1;

            for (i = 1; i < 200000; i++) {

                if (response.findIndex(x => x.id === i) === -1) {
            
                    const startItemIconCollection = (count, index) => {
                
                        setTimeout(() => {
                            
                            axios.get(`https://us.api.blizzard.com/data/wow/media/item/${index}?namespace=static-us&locale=en_US&access_token=${process.env.BLIZZ_API_TOKEN}`).then(res => {
                                
                                let obj = {
                                    id: index,
                                    epoch_datetime: new Date().getTime(), 
                                    iconurl: res.data.assets[0].value
                                }

                                req.app.get('db').icons.insert(obj).then(dbRes => {
                                }).catch(dbErr => {
                                    console.log('Database Insert Error -----------------------------------------', dbErr);
                                });

                            }).catch(wowErr => {

                                if (wowErr.response.status === 404) {
                                    let obj = {
                                        id: index,
                                        epoch_datetime: new Date().getTime(), 
                                        iconurl: null
                                    }

                                    req.app.get('db').icons.insert(obj).then(dbRes => {
                                    }).catch(dbErr => {
                                        console.log('Database Insert Error -----------------------------------------', dbErr);
                                    });
                                } else {
                                    console.log('WoW API Error -----------------------------------------', wowErr);
                                }

                            })

                        }, count * 50);
                    }

                    startItemIconCollection(count, index);
                    count++;
                }

            }

            res.status(200).send('Process Started/Done?');
        }).catch(error => {
            console.log('getItemIcons Error');
            console.log(error);
            res.status(500).send('getItemIcons Error');
        })
    },

}