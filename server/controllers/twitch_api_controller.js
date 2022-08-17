const axios = require('axios');
const crypto = require('crypto');

function verifySignature(messageSignature, messageID, messageTimestamp, body) {
    let message = messageID + messageTimestamp + body;
    let signature = crypto.createHmac('sha256', process.env.TWITCH_SECRET).update(message);
    let expectedSignatureHeader = "sha256=" + signature.digest("hex");

    return expectedSignatureHeader === messageSignature
};

module.exports.twitchController = {

    setTwitchToken: () => {
        axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
        ).then(response => {
            process.env.TWITCH_TOKEN = response.data.access_token;
        }).catch(twitchTokenFetchError => {
            console.log('Twitch API Token Fetch Error: ', twitchTokenFetchError);
        });
    },

    addComplexityStream: (req, res) => {
        axios.get(`https://api.twitch.tv/helix/users?login=${req.params.twitchName}`, {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                "Content-Type": "application/json"
            }
        }).then(response => {
            module.exports.createTwitchWebhook(req, res, response.data.data[0].id);
        }).catch(getTwitchIDError => {
            console.log('Twitch API Get Twitch ID Error: ', getTwitchIDError);
            res.status(502).send('Twitch API Get Twitch ID Error');
        });
    },

    createTwitchWebhook: (req, res, twitchID) => {
        axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', {
            type: "stream.online",
            version: "1",
            condition: {
                broadcaster_user_id: twitchID
            },
            transport: {
                method: "webhook",
                callback: "https://www.complexityguild.net/api/twitch/webhooks/callback",
                secret: process.env.TWITCH_SECRET
            }
        }, 
        {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                "Content-Type": "application/json"
            }
        }).then(response => {
            res.status(200).send('Webhook Verification in Progress...');
        }).catch(addComplexityStreamError => {
            console.log('Twitch API Add Complexity Stream Error: ', addComplexityStreamError);
            res.status(502).send('Twitch API Add Complexity Streamer Error');
        });
    },

    removeComplexityStream: (req, res) => {
        axios.delete(`https://api.twitch.tv/helix/eventsub/subscriptions?id=${req.params.twitchid}`, {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                "Content-Type": "application/json"
            }
        }).then(response => {
            res.send(`${req.params.twitchid} removed.`);
        }).catch(removeComplexityStreamError => {
            console.log('Twitch API Remove Complexity Stream Error: ', removeComplexityStreamError);
            res.status(502).send('Twitch API Remove Complexity Streamer Error');
        });
    },

    listComplexityStream: (req, res) => {
        axios.get(`https://api.twitch.tv/helix/eventsub/subscriptions`, {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                "Content-Type": "application/json"
            }
        }).then(response => {

            const twitchAsyncFunction = async (twitchStreamerList) => {
                const allAsyncResults = [];

                for (const twitchObj of twitchStreamerList) {
                    const asyncResults = await axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${twitchObj.condition.broadcaster_user_id}`, {
                        headers: {
                            "Client-ID": process.env.TWITCH_CLIENT_ID,
                            "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                            "Content-Type": "application/json"
                        }
                    }).catch(twitchChannelInfoError => {
                        console.log('Twitch API Channel Info Error: ', twitchChannelInfoError);
                    });

                    twitchObj.channel_info = asyncResults.data.data[0];
                    allAsyncResults.push(twitchObj)
                }

                return allAsyncResults;
            }

            twitchAsyncFunction(response.data.data).then(data => {
                response.data.data = data;
                res.status(200).send(response.data);
            }).catch(listNameFetchError => {
                console.log('Twitch API List Channel Name Fetch Error', listNameFetchError)
                res.status(502).send('Twitch API List Channel Name Fetch Error');
            });

        }).catch(listComplexityStreamError => {
            console.log('Twitch API List Stream Error: ', listComplexityStreamError);
            res.status(502).send('Twitch API List Streamers Error');
        });
    },

    webhookCallback: (req, res) => {
        if (!verifySignature(req.header("twitch-eventsub-message-signature"),
            req.header("twitch-eventsub-message-id"),
            req.header("twitch-eventsub-message-timestamp"),
            req.rawBody)) {
            res.status(403).send("Forbidden");
        } else {
            if (req.header("twitch-eventsub-message-type") === "webhook_callback_verification") {
                res.send(req.body.challenge) 
            } else if (req.header("twitch-eventsub-message-type") === "notification") {
                
                const {broadcaster_user_name, broadcaster_user_login, broadcaster_user_id, started_at} = req.body.event;

                axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${broadcaster_user_id}`, {
                    headers: {
                        "Client-ID": process.env.TWITCH_CLIENT_ID,
                        "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                        "Content-Type": "application/json"
                    }
                }).then(response => {
                    
                    const {game_name, title} = response.data.data[0];

                    let thumbnail_url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${broadcaster_user_login}-640x360.jpg?time=${new Date().getTime()}`;

                    axios.get(`https://api.twitch.tv/helix/users?login=${broadcaster_user_login}`, {
                        headers: {
                            "Client-ID": process.env.TWITCH_CLIENT_ID,
                            "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                            "Content-Type": "application/json"
                        }
                    }).then(userResponse => {

                        const {description, profile_image_url, offline_image_url} = userResponse.data.data[0];
                        
                        axios.post(process.env.DISCORD_STREAMER_WEBHOOK, 
                            {
                                embeds: [
                                    {
                                        "title": title,
                                        "description": description,
                                        "url": "https://www.twitch.tv/" + broadcaster_user_login,
                                        "color": 6570404,
                                        "footer": {
                                            "text": started_at
                                        },
                                        "image": {
                                            "url": thumbnail_url
                                        },
                                        "thumbnail": {
                                            "url": profile_image_url
                                        },
                                        "author": {
                                            "name": broadcaster_user_name + " is now streaming!"
                                        },
                                        "fields": [
                                            {
                                                "name": "Playing",
                                                "value": game_name,
                                                "inline": true
                                            },
                                        ]
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

                    }).catch(twitchUserInformationError => {
                        console.log('Twitch API User Information Error: ', twitchUserInformationError);
                    });

                }).catch(twitchChannelInfoError => {
                    console.log('Twitch API Channel Info Error: ', twitchChannelInfoError);
                });

                res.send("");
            }
        }
    },

}