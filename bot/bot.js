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

// Database
// const messageLog = require('./messageLog');
const messageController = require('../db/controllers/messages');
const userController    = require('../db/controllers/users');

// handle incoming and outgoing users
bot.on('message', async (msg) => {
    const chatId    = msg.chat.id;
    let userId      = msg.from.id;
    let content     = msg.text;
    // log message
    await bot.getChatMember(chatId, userId).then((res) => {
        if (!res.first_name) {
            messageController.upsertMessage({
                senderId: msg.from.id,
                sender: res.user.username || res.user.first_name,
                message: content
            });
        } else {
            messageController.upsertMessage({
                sender: res.user.first_name,
                message: content
            });
        }
    })
    .then(async () => {
        await messageController.updateCount({
            senderId: msg.from.id,
            $inc: {num_messages_by_sender: 1}
        });
    })
    .catch(err => console.log(err));
    // welcome new members
    if (msg.new_chat_members) {
        console.log(msg.new_chat_members);
        const chatId    = msg.chat.id
            username    = msg.new_chat_members[0].username, 
            firstName   = msg.new_chat_members[0].first_name,
            id          = msg.new_chat_members[0].id;
        if (!firstName) {
            bot.sendMessage(chatId, `Welcome @${username}! Please read our community guidelines before posting: https://goo.gl/DnX1zG | For a list of commands type /help | For official announcements join: https://t.me/diviannouncements`);
            userController.upsertUser({
                id: id,
                username: username
            });
        } else {
            bot.sendMessage(chatId, `Welcome ${firstName}! Please read our community guidelines before posting: https://goo.gl/DnX1zG | For a list of commands type /help | For official announcements join: https://t.me/diviannouncements`);
            userController.upsertUser({
                id       : id,
                firstName: firstName
            });
        };
    };

    if (msg.left_chat_member) {
        console.log('msg.left_chat_member.id', msg.left_chat_member.id);
        userController.deleteUser({'id': msg.left_chat_member.id});
    }

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
        /kyc: FAQs about the KYC/AML process required to redeem DIVI for DIVX
        /announcements: Join our announcements channel`
    );
    bot.sendMessage(chatId, response);
});

module.exports = bot;