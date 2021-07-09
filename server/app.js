require('dotenv').config();

const express = require('express');

//Express
const app = express();

//Body Parser
app.use(express.json({
    verify: function(req,res,buf) {
        if (req.originalUrl === "/api/twitch/webhooks/callback") {
            req.rawBody = buf.toString()
        }
    }
}));
app.use(express.urlencoded({extended: true}));

module.exports = app;