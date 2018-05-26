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
    users: [],
    members: []
};

// handle incoming and outgoing users
bot.on('message', (msg) => {

    if (msg.new_chat_members) {
        console.log(msg.new_chat_members);
        const chatId = msg.chat.id
            username = msg.new_chat_members[0].username, 
            firstName = msg.new_chat_members[0].first_name;
        console.log('number of users',responses.users.length);
        if (!firstName) {
            bot.sendMessage(chatId, `Welcome @${username}! For a list of commands type /help`);
        } else {
            bot.sendMessage(chatId, `Welcome ${firstName}! For a list of commands type /help`);
        };
    };
    for (let i = 0; i < responses.users.length; i++) {
        if (msg.left_chat_member) {
            console.log('number of users',responses.users.length);
            responses.users.splice(responses.users.indexOf(msg.left_chat_member), 1);
            console.log('after',responses.users);
        }  
    };
});

bot.onText(/\/stats/, async (msg, err) => {
    const chatId = msg.chat.id
    
    const chatMemberCount = () => {
        bot.getChatMembersCount(chatId)
            .then((res) => { 
                console.log(res);
                responses.members.push(res);
            })
            .catch(err => {
                if (err) console.log(err);
            })
    };

    chatMemberCount();

    const
        response = await dedent(
        `Number of messages sent: ${JSON.stringify(responses.messages.length)}
        Number of new users: ${JSON.stringify(responses.users.length)}
        Total number of members: ${responses.members[0]}`);
    if (responses.messages.length > 0 || responses.users.length > 0) {
        bot.sendMessage(chatId, response);
    } else {
        bot.sendMessage(chatId, `I'm new here and still getting acquainted with your chat, could you try again?`)
    };
});

bot.onText(/\/help/, (msg, err) => {
    const chatId = msg.chat.id;
    let response = dedent(
        `Here's a list of commands you can use:
        /help: list of commands (you are here)
        /calculator: check out our rewards calculator
        /masternodes: learn about our masternodes
        /mocci: learn what our MOCCI system is all about
        /airdrops: learn how to participate in our airdrops and how they work
        /wp: read our whitepaper (translations available)
        /beta: read about and apply for the main net beta
        /roadmap: see where we are going and where we've been
        /launch: all info regarding the Divi main net launch
        /kyc: FAQs about the KYC/AML process required to redeem DIVI for DIVX`
    );
    bot.sendMessage(chatId, response);
});

module.exports = bot;