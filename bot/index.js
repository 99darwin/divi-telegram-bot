// Dependencies
const TelegramBot = require('node-telegram-bot-api');
const dedent = require('dedent-js');
const _ = require('lodash');
const fs = require('fs');

// Config
const config = require('../config');
const token = config.token;
const testMemberToken = config.testMemberToken;

// Bot
const bot = new TelegramBot(token, {polling: true});
const testMemberBot = new TelegramBot(testMemberToken, {polling: true});

responses = {
    messages: [],
    users: []
}

bot.onText(/\/stats/, (msg, err) => {
    const chatId = msg.chat.id, 
        response = dedent(
        `Number of messages sent: ${JSON.stringify(responses.messages.length)}
        Number of new users: ${JSON.stringify(responses.users.length)}`);
    if (responses.messages.length > 0) {
        bot.sendMessage(chatId, response);
    } else {
        bot.sendMessage(chatId, 'no stats sucka')
    }
})

bot.on('message', (msg) => {
    if (msg.text !== undefined && msg.text !== '/stats') {
        const chatId = msg.chat.id;
        responses.messages.push(msg.text);
        console.log('response.messages:', responses.messages)
    }
});

bot.on('new_chat_members', (msg) => {
    const chatId = msg.chat.id, 
        username = msg.new_chat_members[0].username, 
        firstName = msg.new_chat_members[0].first_name;
    if (!firstName) {
        bot.sendMessage(chatId, `Welcome @${username}!`);
    } else {
        bot.sendMessage(chatId, `Welcome ${firstName}!`)
    }
})

module.exports = bot;