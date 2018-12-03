const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const SchemaTypes = require('../components/schema_types_component');

const ClientSchema = new Schema({
    linked_users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    name: {
        type: String,
        required: [true, 'Name field is required.'],
        unique: true,
        dropDups: true
    },
    color: SchemaTypes.Color
});

ClientSchema.plugin(UniqueValidator);

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;