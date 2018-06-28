const 
    bot     = require('./bot'),
    dedent  = require('dedent-js');

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    let content = msg.text.toLowerCase();

    switch(true) {
        case content.includes('/masternode'):
            bot.sendMessage(chatId,
                dedent(
                    `Here are some resources about Divi Masternodes for you to check out: 
    
                    Divi Masternodes explained: https://medium.com/diviproject/divi-masternodes-explained-f1fe24d8dab5
    
                    Divi Masternode calculator: http://divi-masternode-calculator.herokuapp.com/
    
                    How Masternodes work for you: https://www.youtube.com/watch?v=rBeosdfeUak`
                ));
            break;
        case content.includes('/reward') || content.includes('/return') || content.includes('/roi') || content.includes('/calculator'):
            bot.sendMessage(chatId, 
                dedent(`Are you trying to figure out rewards for a specific Masternode tier? Maybe our calculator can help! Find it here: http://divi-masternode-calculator.herokuapp.com/`)
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
                    `Divi Airdrops have ended. But those with 10 000+ DIVI (100 DIVX) staked in our ecosystem after launch on the 25th will be eligible for lottery rewards!
                    Read more here: https://goo.gl/YHjS6r`
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
        case content.includes('/launch'):
            bot.sendMessage(chatId,
                dedent(
                    `Launch date and swap info: https://goo.gl/BpBrno`
                ));
            break;
        case content.includes('/kyc'):
            bot.sendMessage(chatId,
                dedent(
                    `How to complete KYC: https://goo.gl/9bLhU3
                    If you are not instantly verified, your case is being manually reviewed and an email will be sent to you with further details within 24 hours.
                    `
                ));
            break;
    }
})
