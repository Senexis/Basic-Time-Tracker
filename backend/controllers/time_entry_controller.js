const TimeEntry = require('../models/time_entry');

module.exports = {
    index(req, res, next) {
        TimeEntry.find({})
            .then(result => res.json(result))
            .catch(next);
    },

    create(req, res, next) {
        const properties = {
            // name: req.body.name,
            // color: req.body.color
        };

        TimeEntry.create(properties)
            .then(result => res.json(result))
            .catch(next);
    },

    read(req, res, next) {
        const id = req.params.id;

        TimeEntry.findById(id)
            .orFail(() => Error('Not found'))
            .then(result => res.json(result))
            .catch(next);
    },

    edit(req, res, next) {
        const id = req.params.id;
        const properties = {
            // name: req.body.name,
            // color: req.body.color
        };

        TimeEntry.findByIdAndUpdate(id, properties)
            .orFail(() => Error('Not found'))
            .then(result => res.json(result))
            .catch(next);
    },

    delete(req, res, next) {
        const id = req.params.id;

        TimeEntry.findByIdAndDelete(id)
            .orFail(() => Error('Not found'))
            .then(result => res.status(204).json(result))
            .catch(next);
    },

    multilock(req, res, next) {
        const id = req.params.id;
        const properties = {
            type: req.body.type,
            range: req.body.range
        };
    },

    pause(req, res, next) {
        const id = req.params.id;
        const properties = {
            paused_at: req.body.paused_at
        };
    },

    resume(req, res, next) {
        const id = req.params.id;
        const properties = {
            resumed_at: req.body.resumed_at
        };
    },

    stop(req, res, next) {
        const id = req.params.id;
        const properties = {
            stopped_at: req.body.stopped_at
        };
    },

    lock(req, res, next) {
        const id = req.params.id;
        const properties = {
            locked_at: req.body.locked_at
        };
    }
};