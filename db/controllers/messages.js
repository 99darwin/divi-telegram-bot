const mongoose  = require('mongoose');
const _         = require('lodash');
const rp        = require('request-promise');
const Message   = require('../models/messages');
const stats     = require('../controllers/stats');

const DB_URL    = 'mongodb://localhost/divigramalytics';
if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL) };


// return information about how many messages have been sent
// return information about the users sending the messages
// most active users

module.exports = {
    // add messages to database
    upsertMessage: (msgObj) => {
        let conditions = { 
            senderId: msgObj.senderId,
            sender: msgObj.sender,
            message: msgObj.message,
            date: new Date()
        }
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    
        Message.findOneAndUpdate(conditions, msgObj, options, (err, result) => {
            if (err) throw err;
            console.log('upsertMessage =>', result);
        });
    },

    updateCount: (msgObj) => {
        let query = {senderId: msgObj.senderId};
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Message.findOneAndUpdate(query, msgObj, options, (err, result) => {
            if (err) throw err;
            console.log('updateCount =>', result);
        })
    },

    // count how many messages have been stored
    countMessages: (req, res) => {
        Message.count({}, (err, count) => {
            if (err) throw err;
            res.json({num_messages: count});
        });
    },

    // count how many messages have been sent by a specific user
    countUserMessages: (req, res) => {
        Message.count({sender: req.params.user}, (err, count) => {
            if (err) throw err;
            res.json({
                username: req.params.user,
                num_messages_by_user: count
            });
        });
    },

    // count how many messages have been sent by all users
    countAllUserMessages: (req, res) => {
        Message.find({}, (err, sender) => {
            if (err) throw err;
            console.log(sender);
            const senderMap = {};
            sender.forEach(sender => {
                senderMap[sender[0]] = sender;
            })
            res.json(senderMap);
        })
    }
}
