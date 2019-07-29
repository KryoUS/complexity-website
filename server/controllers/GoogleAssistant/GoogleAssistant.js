// Import the appropriate service and chosen wrappers
const { dialogflow, Image, BasicCard, Button, Suggestions } = require('actions-on-google');
const quotes = require('../Database/quotes_controller');
const stats = require('../Database/stats_controller');
const log = require('../Database/logs_controller');
const wow = require('../blizzard_api_controller');
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
    if (conv.screen) {
        conv.ask(new Suggestions(['Current WoW Token Price?', 'Most fish caught?', 'Fewest total deaths?', 'Most arena victories?']));
    }
})

actions.intent('Which Server', conv => {
    const { queryResult } = conv.body;
    log.addGoogleAssistantLog(queryResult.intent.displayName, queryResult.queryText);
    conv.ask('Thunderlord is the home to Complexity.')
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
                conv.ask(`That would be ${player.character_name} at ${player[statObj.dbValue]}.`)

                conv.ask(new BasicCard({
                    text: player.spec_desc,
                    subtitle: `Level ${player.level} ${player.spec_name} ${player.className}`,
                    title: player.character_name,
                    buttons: [
                        new Button({
                            title: 'Armory',
                            url: `https://worldofwarcraft.com/en-us/character/us/${player.realm}/${player.character_name}`,
                        }),
                        new Button({
                            title: 'Raider.IO',
                            url: `https://raider.io/characters/us/${player.realm}/${player.character_name}`,
                        }),
                        new Button({
                            title: 'WoW Progress',
                            url: `https://www.wowprogress.com/character/us/${player.realm}/${player.character_name}`,
                        })
                    ],
                    image: new Image({
                        url: player.avatar_large,
                        alt: player.character_name,
                    }),
                    display: 'CROPPED',
                }));

            } else {
                conv.ask(`That would be ${player.character_name} at ${player[statObj.dbValue]}.`)
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

actions.intent('Token', conv => {
    const { queryResult } = conv.body;
    log.addGoogleAssistantLog(queryResult.intent.displayName, queryResult.queryText);
    conv.ask(`The current value of a World of Warcraft token is ${wow.getTokenPrice().price.toString().slice(0,-4)} gold.`)
})

// Intent in Dialogflow called `Goodbye`
actions.intent('Goodbye', conv => {
    conv.close('See you later!')
})

actions.intent('Default Fallback Intent', conv => {
    conv.ask(`I didn't understand. You can ask questions like, "What is the current WoW Token price?" or "Who has the most arena victories?"`)
    if (conv.screen) {
        conv.ask(new Suggestions(['Current WoW Token Price?', 'Most fish caught?', 'Fewest total deaths?', 'Most arena victories?']));
    }
})

module.exports = actions;