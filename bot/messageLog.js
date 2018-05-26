const bot = require('./bot');

module.exports = {
    getMessage: () => {
        bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            let content = msg.text.toLowerCase();
    
            if (msg.text !== undefined && msg.text !== '/stats') {
                responses.messages.push(msg.text);
                console.log('response.messages:', responses.messages);
                return(responses.messages);
            }
        })
    }
}
