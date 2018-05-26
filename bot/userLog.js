// const TelegramBot = require('node-telegram-bot-api');

// // Config
// const config = require('../config');
// const token = config.token;

// const bot = new TelegramBot(token, {polling: true});

// const userLog = () => {
    
//     let users = [];

//     return bot.on('message', (msg) => {

//         if (msg.new_chat_members) {
//             // get user data
//             const chatId = msg.chat.id
//                 username = msg.new_chat_members[0].username, 
//                 firstName = msg.new_chat_members[0].first_name;
//                 lastName = msg.new_chat_members[0].last_name;
//             // define user data based on schema
//             userToAdd = {
//                 firstName: firstName,
//                 lastName: lastName,
//                 userName: username
//             };
//             // push user data to users array
//             users.push(userToAdd);
//             // greet new users
//             if (!firstName) {
//                 bot.sendMessage(chatId, `Welcome @${username}! For a list of commands type /help`);
//             } else {
//                 bot.sendMessage(chatId, `Welcome ${firstName}! For a list of commands type /help`);
//             };
//         };
//         return users;
//     });
    
// }

// module.exports = userLog;