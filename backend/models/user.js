const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const SchemaTypes = require('../components/schema_types_component');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    email: {
        type: String,
        required: [true, 'Email field is required.'],
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: [true, 'Password field is required.']
    },
    reset_token: {
        type: String
    },
    color: SchemaTypes.Color
});

UserSchema.plugin(UniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;