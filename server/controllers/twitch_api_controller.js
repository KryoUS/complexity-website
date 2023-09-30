const twitch = require('./Axios/twitch');
const crypto = require('crypto');

function verifySignature(messageSignature, messageID, messageTimestamp, body) {
    let message = messageID + messageTimestamp + body;
    let signature = crypto.createHmac('sha256', process.env.TWITCH_SECRET).update(message);
    let expectedSignatureHeader = "sha256=" + signature.digest("hex");

    return expectedSignatureHeader === messageSignature
};

module.exports.twitchController = {

    addComplexityStream: (req, res) => {
        twitch.get(`/helix/users?login=${req.params.twitchName}`).then(response => {
            module.exports.createTwitchWebhook(req, res, response.data.data[0].id);
        }).catch(getTwitchIDError => {
            // Twitch Interceptor is logging.
            // console.log('Twitch API Get Twitch ID Error: ', getTwitchIDError);
            res.status(502).send('Twitch API Get Twitch ID Error');
        });
    },

    createTwitchWebhook: (req, res, twitchID) => {
        twitch.post('/helix/eventsub/subscriptions', {
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
        }).then(response => {
            res.status(200).send('Webhook Verification in Progress...');
        }).catch(addComplexityStreamError => {
            // Twitch Interceptor is logging.
            // console.log('Twitch API Add Complexity Stream Error: ', addComplexityStreamError);
            res.status(502).send('Twitch API Add Complexity Streamer Error');
        });
    },

    removeComplexityStream: (req, res) => {
        twitch.delete(`/helix/eventsub/subscriptions?id=${req.params.twitchid}`).then(response => {
            res.send(`${req.params.twitchid} removed.`);
        }).catch(removeComplexityStreamError => {
            // Twitch Interceptor is logging.
            // console.log('Twitch API Remove Complexity Stream Error: ', removeComplexityStreamError);
            res.status(502).send('Twitch API Remove Complexity Streamer Error');
        });
    },

    listComplexityStream: (req, res) => {
        twitch.get(`/helix/eventsub/subscriptions`).then(response => {

            const twitchAsyncFunction = async (twitchStreamerList) => {
                const allAsyncResults = [];

                for (const twitchObj of twitchStreamerList) {
                    const asyncResults = await twitch.get(`/helix/channels?broadcaster_id=${twitchObj.condition.broadcaster_user_id}`)
                    .catch(twitchChannelInfoError => {
                        // Twitch Interceptor is logging.
                        // console.log('Twitch API Channel Info Error: ', twitchChannelInfoError);
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
            // Twitch Interceptor is logging.
            // console.log('Twitch API List Stream Error: ', listComplexityStreamError);
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

                twitch.get(`/helix/channels?broadcaster_id=${broadcaster_user_id}`).then(response => {
                    
                    const {game_name, title} = response.data.data[0];

                    let thumbnail_url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${broadcaster_user_login}-640x360.jpg?time=${new Date().getTime()}`;

                    twitch.get(`/helix/users?login=${broadcaster_user_login}`).then(userResponse => {

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
                        // Twitch Interceptor is logging.
                        // console.log('Twitch API User Information Error: ', twitchUserInformationError);
                    });

                }).catch(twitchChannelInfoError => {
                    // Twitch Interceptor is logging.
                    // console.log('Twitch API Channel Info Error: ', twitchChannelInfoError);
                });

                res.send("");
            }
        }
    },

}