const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const userSchema    = new Schema({
    id:         { type: String, required: true },
    firstName:  { type: String, required: false },
    userName:   { type: String, required: false },
    date:       { type: Date, default: Date.now}
});

const User          = mongoose.model("User", userSchema);

module.exports      = User;