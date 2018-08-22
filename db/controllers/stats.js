const mongoose          = require('mongoose');
const Stat              = require('../models/stats');

const DB_URL    = 'mongodb://localhost/divigramalytics';
if (mongoose.connection.readyState == 0) { mongoose.connect(DB_URL) };

module.exports = {
    upsertStats: (statsObj) => {
        let conditions = {
            messages: statsObj.messages,
            users: statsObj.users
        };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };

        Stat.findOneAndUpdate(conditions, statsObj, options, (err, result) => {
            if (err) throw err;
        });
    }
}