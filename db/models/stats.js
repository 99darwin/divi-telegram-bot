const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;

const statSchema    = new Schema({
    messages:   { type: Number, required: false },
    users:      { type: Number, required: false }
});

const Stat          = mongoose.model('Stat', statSchema);

module.exports      = Stat;