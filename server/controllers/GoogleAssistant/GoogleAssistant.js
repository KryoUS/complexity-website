// Import the appropriate service and chosen wrappers
const { dialogflow, Image } = require('actions-on-google');
const quotes = require('../Database/quotes_controller');
const stats = require('../Database/stats_controller');
const log = require('../Database/logs_controller');
const dbStat = require('./statistics');

const actions = dialogflow();

const intentError = (conv) => {
    log.addGoogleAssistantLog(queryResult.intent.displayName, queryResult.queryText, conv);
    return conv.ask('There was an error in completing your request. Please try again later.')
};

const sqlOrder = (difference) => {
    if (difference === 'most') {
        return 'desc'
    } else {
        return 'asc'
    }
}

actions.intent('Default Welcome Intent', conv => {
    conv.ask('Well met! What would you like to know about Complexity?')
    // conv.ask(new Image({
    //     url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    //     alt: 'A cat',
    // }))
})

actions.intent('Which Server', conv => {
    const { queryResult } = conv.body;
    log.addGoogleAssistantLog(queryResult.intent.displayName, queryResult.queryText);
    conv.ask('Complexity is located on the Thunderlord server.')
})

actions.intent('Statistics', conv => {
    const { difference, statistics } = conv.parameters;
    const statObj = dbStat.find(stat => {
        return stat.value === statistics
    });
    const orderBy = sqlOrder(difference);

    return stats.getMostOrLeast(orderBy, statObj.dbValue).then(player => {

        if (typeof quote == 'number') {
            intentError(conv);
        } else {
            const { queryResult } = conv.body;
            log.addGoogleAssistantLog(queryResult.intent.displayName, queryResult.queryText);

            if (conv.screen) {
                conv.ask(`${player.character_name} has the ${difference} ${statistics} at ${player[statObj.dbValue]}.`)
                conv.ask(new Image({
                    url: player.avatar_large,
                    alt: player.character_name,
                }))
            } else {
                conv.ask(`${player.character_name} has the ${difference} ${statistics} at ${player[statObj.dbValue]}.`)
            }
        }
    });
    
})

actions.intent('Characters', conv => {
    return stats.characterCount().then(count => {

        if (count.count === 500) {
            intentError(conv);
        } else {
            const { queryResult } = conv.body;
            log.addGoogleAssistantLog(queryResult.intent.displayName, queryResult.queryText);
            conv.ask(`Complexity currently has ${count.count} characters.`)
        }
    })
})

actions.intent('Random Quote', conv => {
    return quotes.get().then(quote => {
        if (typeof quote == 'number') {
            intentError(conv);
        } else {
            const { queryResult } = conv.body;
            log.addGoogleAssistantLog(queryResult.intent.displayName, queryResult.queryText);
            conv.ask(`${quote.said_by} once said, "${quote.quote}"`)
        }
    });
})

// Intent in Dialogflow called `Goodbye`
actions.intent('Goodbye', conv => {
    conv.close('See you later!')
})

actions.intent('Default Fallback Intent', conv => {
    conv.ask(`I didn't understand. Can you tell me something else?`)
})

module.exports = actions;