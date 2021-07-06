const axios = require('axios');
const crypto = require('crypto');

function verifySignature(messageSignature, messageID, messageTimestamp, body) {
    let message = messageID + messageTimestamp + body;
    let signature = crypto.createHmac('sha256', "c0mp13xity").update(message);
    let expectedSignatureHeader = "sha256=" + signature.digest("hex");

    return expectedSignatureHeader === messageSignature
};

module.exports = {

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
        });
    },

    createTwitchWebhook: (req, res, twitchID) => {
        console.log(`Registering Twitch Webhook...`);
        axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', {
            type: "stream.online",
            version: "1",
            condition: {
                broadcaster_user_id: twitchID
            },
            transport: {
                method: "webhook",
                callback: "https://www.complexityguild.net/api/twitch/webhooks/callback",
                secret: "c0mp13xity"
            }
        }, 
        {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": 'Bearer ' + process.env.TWITCH_TOKEN,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(`Webhook Verification in Progress...`, response.data);
            res.status(200).send('Webhook Verification in Progress...');
        }).catch(addComplexityStreamError => {
            console.log('Twitch API Add Complexity Stream Error: ', addComplexityStreamError);
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
            console.log('Remove Complexity Stream Error: ', removeComplexityStreamError);
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
            res.status(200).send(response.data);
        }).catch(listComplexityStreamError => {
            console.log('Twitch API List Stream Error: ', listComplexityStreamError);
        })
    },

    webhookCallback: (req, res) => {
        if (!verifySignature(req.header("Twitch-Eventsub-Message-Signature"),
            req.header("Twitch-Eventsub-Message-Id"),
            req.header("Twitch-Eventsub-Message-Timestamp"),
            req.rawBody)) {
            res.status(403).send("Forbidden");
        } else {
            if (req.header("Twitch-Eventsub-Message-Type") === "webhook_callback_verification") {
                res.send(req.body.challenge) 
            } else if (req.header("Twitch-Eventsub-Message-Type") === "notification") {
                console.log(req.body.event) //Send Event to Discord webhook.
                
                // axios.post('https://discord.com/api/webhooks/860371543573004299/zzGMyZMJlgi3hucM7RvOynZ4KGqYzo148Wqj-tye5AksMw1xu9Lh5CB9prFGy8V3Mlcm', 
                //     {
                //         "title": title,
                //         "url": "https://www.twitch.tv/" + user_login,
                //         "color": 6570404,
                //         "footer": {
                //             "text": started_at
                //         },
                //         "image": {
                //             "url": thumbnail_url.replace('{width}', 440).replace('{height}', 248)
                //         },
                //         "author": {
                //             "name": user_name + " is now streaming"
                //         },
                //         "fields": [
                //             {
                //                 "name": "Playing",
                //                 "value": game_name,
                //                 "inline": true
                //             },
                //             {
                //                 "name": "Started at (streamer timezone)",
                //                 "value": started_at,
                //                 "inline": true
                //             }
                //         ]
                //     },
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //     }
                // ).then(response => {
                //     console.log("Discord Posted that a user went live!");
                // }).catch(twitchNotificationError => {
                //     console.log("Twitch Notification Error: ", twitchNotificationError);
                // });

                res.send("");
            }
        }
    },

}