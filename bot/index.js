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

let responses = {
    messages: [],
    users: []
};

// handle incoming and outgoing users
bot.on('message', (msg) => {
    if (msg.new_chat_members) {
        console.log(msg.new_chat_members);
        const chatId = msg.chat.id
            username = msg.new_chat_members[0].username, 
            firstName = msg.new_chat_members[0].first_name;
        responses.users.push(msg.new_chat_members[0]);
        console.log('number of users',responses.users.length);
        if (!firstName) {
            bot.sendMessage(chatId, `Welcome @${username}!`);
        } else {
            bot.sendMessage(chatId, `Welcome ${firstName}!`);
        };
    };
    console.log('before',responses.users)
    for (let i = 0; i < responses.users.length; i++) {
        if (msg.left_chat_member) {
            console.log('number of users',responses.users.length);
            responses.users.splice(responses.users.indexOf(msg.left_chat_member), 1);
            console.log('after',responses.users);
        }  
    };
});

bot.onText(/\/stats/, (msg, err) => {
    const chatId = msg.chat.id, 
        response = dedent(
        `Number of messages sent: ${JSON.stringify(responses.messages.length)}
        Number of new users: ${JSON.stringify(responses.users.length)}`);
    if (responses.messages.length > 0 || responses.users.length > 0) {
        bot.sendMessage(chatId, response);
    } else {
        bot.sendMessage(chatId, 'no stats sucka')
    };
});

bot.onText(/\/help/, (msg, err) => {
    const chatId = msg.chat.id;
    let response = dedent(
        `Here's a list of commands you can use:
        /help: list of commands
        /stats: basic stats about the chat
        /`
    );
    bot.sendMessage(chatId, response);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    let content = msg.text.toLowerCase();

    if (msg.text !== undefined && msg.text !== '/stats') 
    {
        responses.messages.push(msg.text);
        console.log('response.messages:', responses.messages);
    }
    
    switch(true) {
        case content.includes('moon'):
            bot.sendMessage(chatId, 'when mars?')
            break;
        case content.includes('masternodes'):
            bot.sendMessage(chatId, 
                dedent(
                    `Here are some resources about Divi Masternodes for you to check out: 
    
                    Divi Masternodes explained: https://medium.com/diviproject/divi-masternodes-explained-f1fe24d8dab5
    
                    Divi Masternode calculator: https://diviproject.org/calculator
    
                    How Masternodes work for you: https://www.youtube.com/watch?v=rBeosdfeUak`
                ));
            break;
        case content.includes('rewards'):
            bot.sendMessage(chatId, 
                dedent(`Are you trying to figure out rewards for a specific Masternode tier? Maybe our calculator can help! Find it here: https://diviproject.org/calculator`)
            );
            break;
        case content.includes('mocci'):
            bot.sendMessage(chatId, 
                dedent(
                    `The MOCCI (pronounced mo-chee), or Master One Click Cloud Installer, is a revolutionary new way to set up DIVI Masternodes at the click of a button. 
                    It will be available with the first release of DIVI's software.`
                ));
            break;
    }
});

module.exports = bot;