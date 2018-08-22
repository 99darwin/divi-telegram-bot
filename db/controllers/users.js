const mongoose  = require('mongoose');
const User      = require('../models/users');

const DB_URL    = 'mongodb://localhost/divigramalytics';
if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL) };

module.exports = {

    upsertUser: (userObj) => {
        let conditions = {
            id: userObj.id,
            firstName: userObj.firstName,
            userName: userObj.userName,
            date: new Date()
        };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };

        User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
            if (err) throw err;
        });
    },

    deleteUser: (userObj) => {
        User.deleteOne({'id': userObj.id}, (err, result) => {
            if (err) throw err;
        });
    },

    countUsers: (req, res) => {
        console.log('we countin hoes');
        User.count({}, (err, count) => {
            if (err) throw err;
            res.json({num_users: count})
        })
    }
}