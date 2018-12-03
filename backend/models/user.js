const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    email: {
        type: String,
        required: [true, 'Email field is required.']
    },
    password: {
        type: String,
        required: [true, 'Password field is required.']
    },
    reset_token: {
        type: String
    },
    color: {
        type: String
    },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;