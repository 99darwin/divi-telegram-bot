const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const messageSchema = new Schema({
    senderId:               { type: String, required: true},
    sender:                 { type: String, required: false },
    message:                { type: String, required: true },
    num_messages_by_sender: { type: Number, default: 0},
    date:                   { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;