const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const SchemaTypes = require('../helpers/schema_types_helper');

const TagSchema = new Schema({
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

TagSchema.statics.findOneOrCreate = function findOneOrCreate(find, create) {
    const model = this;

    return new Promise((resolve, reject) => {
        model.findOne(find, (err, result) => {
            if (err) return reject(err);
            if (result) return resolve(result);

            model.create(create, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    });
}

TagSchema.plugin(UniqueValidator);

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;