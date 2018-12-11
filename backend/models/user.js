const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = require('../helpers/schema_types_helper');
const UniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    method: {
        type: String,
        enum: ['local'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    color: SchemaTypes.Color
});

UserSchema.pre('save', async function(next) {
    try {
        if (this.method !== 'local') next();

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash;

        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.local.password)
    } catch (err) {
        throw new Error(err);
    }
}

UserSchema.method('toJSON', function () {
    var user = this.toObject();
    delete user.local.password;
    return user;
});

UserSchema.plugin(UniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;