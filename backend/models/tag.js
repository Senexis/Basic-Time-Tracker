const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
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

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;