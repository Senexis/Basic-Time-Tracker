const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeEntrySchema = new Schema({
    user: {
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
    paused_at: {
        type: Date
    },
    resumed_at: {
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
});

const TimeEntry = mongoose.model('time_entry', TimeEntrySchema);

module.exports = TimeEntry;