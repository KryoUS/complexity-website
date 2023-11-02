const { app } = require('../../app');
const axios = require('axios');

module.exports.breakingNewsController = {

    breakingNews: () => {
        axios.get('http://launcher.worldofwarcraft.com/alert').then(alertRes => {
        
            //Create object for DB Insert, removing Blizzard's HTML.
            let obj = {
                epoch_datetime: new Date().getTime(),
                alert: alertRes.data.substring(alertRes.data.indexOf('<p>') + 3, alertRes.data.indexOf('</p>') - 1),
            };

            if (alertRes.data.length !== 0) {
                
                app.get('db').breakingnews.findOne({alert: obj.alert}).then(findRes => {
                    
                    if (findRes === null) {
                        
                        app.get('db').breakingnews.insert(obj).then(response => {
                            
                            axios.post(process.env.DISCORD_REALMSTATUS_WEBHOOK, 
                                {
                                    embeds: [
                                        {
                                            "title": "Breaking News",
                                            "description": `"${obj.alert}"`,
                                            "color": 44799,
                                            "author": {
                                                "name": "World of Warcraft",
                                                "icon_url": "https://assets.worldofwarcraft.com/static/components/Logo/Logo-wowIcon.01e2c443798558c38d8e3b143a6f0d03.png",
                                                "url": "https://worldofwarcraft.com/"
                                            },
                                            "timestamp": new Date().toISOString(),
                                        }
                                    ]
                                },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                            ).then(discordResponse => {
                                
                            }).catch(discordWebhookError => {
                                console.log("Discord Webhook POST Error: ", discordWebhookError);
                            });

                        }).catch(insertError => {
                            console.log("DB Insert Error", insertError);
                        });

                    };

                }).catch(findOneError => {
                    console.log('Searching for an alert and it derped.', findOneError);
                });
            };

        }).catch(breakingNewsGetError => {
            console.log('breakingNewsGetError ', breakingNewsGetError);
        });
    }
}