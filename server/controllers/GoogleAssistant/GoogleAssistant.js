// Import the appropriate service and chosen wrappers
const { dialogflow, Image } = require('actions-on-google');

const actions = dialogflow();

actions.intent('Default Welcome Intent', conv => {
    conv.ask('Well met! Have a picture of a kitty.')
    conv.ask(new Image({
        url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
        alt: 'A cat',
    }))
})

// Intent in Dialogflow called `Goodbye`
actions.intent('Goodbye', conv => {
    conv.close('See you later!')
})

actions.intent('Default Fallback Intent', conv => {
    conv.ask(`I didn't understand. Can you tell me something else?`)
})

module.exports = actions;