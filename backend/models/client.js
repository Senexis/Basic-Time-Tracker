const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    linked_users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    color: {
        type: String
    },
});

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;