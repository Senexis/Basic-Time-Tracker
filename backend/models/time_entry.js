const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaOptions = {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};

const TimeEntrySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User reference is required.']
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: [true, 'Client reference is required.']
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    started_at: {
        type: Date,
        required: [true, 'Started at field is required.'],
        default: Date.now
    },
    is_running: {
        type: Boolean,
        default: true
    },
    paused_at: {
        type: Date
    },
    resumed_at: {
        type: Date
    },
    ended_at: {
        type: Date
    },
    time_worked: {
        type: Number,
        default: 0
    },
    notes: {
        type: String
    },
    locked_at: {
        type: Date
    },
}, schemaOptions);

const TimeEntry = mongoose.model('time_entry', TimeEntrySchema);

module.exports = TimeEntry;