const userController        = require('./db/controllers/users');
const messageController     = require('./db/controllers/messages');
const statsController       = require('./db/controllers/stats');

module.exports = (app) => {

    // get number of users
    app.get('/countusers', userController.countUsers);
    // get number of messages
    app.get('/countmessages', messageController.countMessages);
    // get number of messages by specific user
    app.get('/usermessages/:user', messageController.countUserMessages);
    app.get('/allusermessages', messageController.countAllUserMessages);
    // get total users for a day, month, week, year

}