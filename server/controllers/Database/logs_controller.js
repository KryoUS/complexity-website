const app = require('../../app');
const functions = require('./tools/functions');

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

    getServicesLog: (req, res) => {
    
        req.app.get('db').query('select * from serviceslog').then(response => {
            res.status(200).send(response);
        }).catch(error => {
            console.log('ServicesLog Error');
            console.log(error);
            res.status(500).send('ServicesLog Error');
        })
    },

    addGoogleAssistantLog: (intent, querytext, errorJSON) => {
        app.get('db').googleassistantlog.insert({ 
            epoch_datetime: new Date().getTime(),
            intent: intent, 
            querytext: querytext, 
            error: errorJSON ? JSON.stringify(errorJSON, functions.getCircularReplacer()) : '{}'
        }).then(result => {
            //Do nothing with results
        }).catch(error => {
            console.log(`${new Date()} Massive.js CharacterCronLogging Insert Error = `, error);
        })
    },
}