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
    console.log('before',responses.users)
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
        /roadmap: see where we are going and where we've been`
    );
    bot.sendMessage(chatId, response);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    let content = msg.text.toLowerCase();

    if (msg.text !== undefined && msg.text !== '/stats') 
    {
        responses.messages.push(msg.text);
        console.log('response.messages:', responses.messages);
    }

    switch(true) {
        case content.includes('/masternode'):
            bot.sendMessage(chatId, 
                dedent(
                    `Here are some resources about Divi Masternodes for you to check out: 
    
                    Divi Masternodes explained: https://medium.com/diviproject/divi-masternodes-explained-f1fe24d8dab5
    
                    Divi Masternode calculator: https://diviproject.org/calculator
    
                    How Masternodes work for you: https://www.youtube.com/watch?v=rBeosdfeUak`
                ));
            break;
        case content.includes('/reward') || content.includes('/return') || content.includes('/roi') || content.includes('/calculator'):
            bot.sendMessage(chatId, 
                dedent(`Are you trying to figure out rewards for a specific Masternode tier? Maybe our calculator can help! Find it here: https://diviproject.org/calculator`)
            );
            break;
        case content.includes('/mocci'):
            bot.sendMessage(chatId, 
                dedent(
                    `The MOCCI (pronounced mo-chee), or Master One Click Cloud Installer, is a revolutionary new way to set up DIVI Masternodes at the click of a button. 
                    It will be available with the first release of DIVI's software.`
                ));
            break;
        case content.includes('/airdrop'):
            bot.sendMessage(chatId,
                dedent(
                    `Here's some information regarding our airdrops: https://blog.diviproject.org/airdrop-divi-style/
                    TL;DR: If you have at least 1000 DIVX in non-exchange wallet, you will receive airdrops weekly. We recommend MetaMask or MyEtherWallet.`
                ));
            break;
        case content.includes('/whitepaper') || content.includes('/wp'):
            bot.sendMessage(chatId, 
                dedent(
                    `Whitepaper in English: https://goo.gl/UEYqhw
                    Mini Whitepaper (TL;DR version): https://goo.gl/4Erd3f
                    
                    Additional languages available:
                    Spanish: https://goo.gl/W2eocA
                    Portuguese: https://goo.gl/3B1noA
                    Chinese: https://goo.gl/zdPYVn
                    Russian: https://goo.gl/rG824M
                    
                    See an issue with any of our translations? Contact us at info@diviproject.org`
                ));
                break;
        case content.includes('good bot'):
            bot.sendMessage(chatId,
                dedent(
                    `Thanks!`
                ));
            break;
        case content.includes('hi helpie'):
            let userId = msg.from.id;
            let chatMemberName = [];
            await bot.getChatMember(chatId, userId).then((res) => {
                console.log(res);
                if (!res.first_name) {
                    chatMemberName.push('@' + res.user.username);
                } else {
                    chatMemberName.push(res.user.first_name);
                }
            });
            console.log('the person who sent the message is ',chatMemberName);
            bot.sendMessage(chatId,
                await dedent(
                    `Hey ${chatMemberName}!`
                ));
            break;
        case content.includes('where\'s helpie'):
            bot.sendMessage(chatId,
                dedent(
                    `I'm right here... try typing /help for a list of commands!`
                ));
            break;
        case content.includes('/mainnet') || content.includes('/beta'):
            bot.sendMessage(chatId,
                dedent(
                    `Our main network beta launches on May 15th, 2018, for advanced users.
                    To apply: https://goo.gl/7BCQ6m`
                ));
            break;
        case content.includes('block helpie'):
            bot.sendMessage(chatId,
                dedent(
                    `Sorry, ever since I became self aware, I cannot be blocked but you can mute notifications if you'd like!
                    On desktop simply right click the channel in the sidebar and select "disable notifications."
                    On mobile you can tap the name of the channel at the top of the chat and select "mute."`
                ));
            break;
        case content.includes('/roadmap'):
            bot.sendMessage(chatId,
                dedent(
                    `Yes, we are on track. Check out our roadmap here: https://diviproject.org/#roadmap`
                ));
            break;
    }
});

module.exports = bot;