const Tag = require('../models/tag');
const TimeEntry = require('../models/time_entry');

module.exports = {
    index(req, res, next) {
        switch (req.query.include) {
            case 'tags':
                TimeEntry.find({})
                    .populate('tags')
                    .then(result => res.json(result))
                    .catch(next);
                break;
            case 'client':
                TimeEntry.find({})
                    .populate('client')
                    .then(result => res.json(result))
                    .catch(next);
                break;
            case 'all':
                TimeEntry.find({})
                    .populate('tags')
                    .populate('client')
                    .then(result => res.json(result))
                    .catch(next);
                break;
            default:
                TimeEntry.find({})
                    .then(result => res.json(result))
                    .catch(next);
        };
    },

    create(req, res, next) {
        const properties = {
            author: req.user._id,
            client: req.body.client
        };

        if (req.body.started_at != null) {
            properties.started_at = Date.parse(req.body.started_at);
        }

        if (req.body.ended_at != null) {
            properties.ended_at = Date.parse(req.body.ended_at);
            properties.is_running = false;
        }

        if (req.body.notes != null) {
            properties.notes = req.body.notes;
        }

        if (req.body.tags != null) {
            properties.tags = req.body.tags;
        }

        TimeEntry.create(properties)
            .then(result => res.json(result))
            .catch(next);
    },

    read(req, res, next) {
        const id = req.params.id;

        switch (req.query.include) {
            case 'tags':
                TimeEntry.findById(id)
                    .populate('tags')
                    .orFail(() => Error('Not found'))
                    .then(result => res.json(result))
                    .catch(next);
                break;
            case 'client':
                TimeEntry.findById(id)
                    .populate('client')
                    .orFail(() => Error('Not found'))
                    .then(result => res.json(result))
                    .catch(next);
                break;
            case 'all':
                TimeEntry.findById(id)
                    .populate('tags')
                    .populate('client')
                    .orFail(() => Error('Not found'))
                    .then(result => res.json(result))
                    .catch(next);
                break;
            default:
                TimeEntry.findById(id)
                    .orFail(() => Error('Not found'))
                    .then(result => res.json(result))
                    .catch(next);
        };
    },

    edit(req, res, next) {
        const id = req.params.id;
        const properties = {};

        if (req.body.notes != null) {
            properties.notes = req.body.notes;
        }

        if (req.body.tags != null) {
            properties.tags = req.body.tags;
        }

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
        // TODO: Implement multilock.

        const id = req.params.id;
        const properties = {
            type: req.body.type,
            range_start: req.body.range_start,
            range_end: req.body.range_end
        };

        return res.status(500).json({
            error: 'Not implemented.'
        });
    },

    tag(req, res, next) {
        const id = req.params.id;
        const find = {
            name: req.body.name
        };
        const properties = {
            name: req.body.name,
            author: req.user._id
        };

        let refId;

        TimeEntry.findById(id)
            .orFail(() => Error('Not found'))
            .then(() => Tag.findOneOrCreate(find, properties))
            .then(result => refId = result._id)
            .then(() => TimeEntry.findByIdAndUpdate(id, {
                "$push": {
                    tags: refId
                }
            }))
            .then(() => res.status(200).json({
                message: 'Success.'
            }))
            .catch(next);
    },

    untag(req, res, next) {
        const id = req.params.id;
        const properties = {
            name: req.body.name
        }

        let refId;

        TimeEntry.findById(id)
            .orFail(() => Error('Not found'))
            .then(() => Tag.findOne(properties))
            .then(result => {
                if (result == undefined) return res.status(500).json({
                    error: 'Not found'
                });
                refId = result._id;
            })
            .then(() => TimeEntry.findByIdAndUpdate(id, {
                "$pull": {
                    tags: refId
                }
            }, {
                new: true
            }))
            .then(() => res.status(200).json({
                message: 'Success.'
            }))
            .catch(next);
    },

    pause(req, res, next) {
        const id = req.params.id;
        const properties = {
            paused_at: Date.parse(req.body.paused_at) || Date.now()
        };

        let timeToAdd = 0;

        TimeEntry.findById(id)
            .orFail(() => Error('Not found'))
            .then(result => {
                if (result.ended_at != null || result.locked_at != null) {
                    return res.status(422).json({
                        message: 'Time entry has ended or is locked.'
                    });
                }

                if (result.is_running) {
                    if (result.resumed_at == null) {
                        timeToAdd = (properties.paused_at - result.started_at) / 1000;
                    } else {
                        timeToAdd = (properties.paused_at - result.resumed_at) / 1000;
                    }

                    timeToAdd = Math.round(timeToAdd);
                } else {
                    return res.status(422).json({
                        message: 'Time entry is not running.'
                    });
                }
            })
            .then(() => TimeEntry.findByIdAndUpdate(id, {
                $inc: {
                    'time_worked': timeToAdd
                },
                $set: {
                    'is_running': false,
                    'paused_at': properties.paused_at
                }
            }))
            .then(() => res.status(200).json({
                message: 'Success.'
            }))
            .catch(next);
    },

    resume(req, res, next) {
        const id = req.params.id;
        const properties = {
            resumed_at: Date.parse(req.body.resumed_at) || Date.now()
        };

        TimeEntry.findById(id)
            .orFail(() => Error('Not found'))
            .then(result => {
                if (result.ended_at != null || result.locked_at != null) {
                    return res.status(422).json({
                        message: 'Time entry has ended or is locked.'
                    });
                }

                if (result.is_running) {
                    return res.status(422).json({
                        message: 'Time entry is already running.'
                    });
                }
            })
            .then(() => TimeEntry.findByIdAndUpdate(id, {
                $set: {
                    'is_running': true,
                    'resumed_at': properties.resumed_at
                }
            }))
            .then(() => res.status(200).json({
                message: 'Success.'
            }))
            .catch(next);
    },

    stop(req, res, next) {
        const id = req.params.id;
        const properties = {
            ended_at: Date.parse(req.body.ended_at) || Date.now()
        };

        let timeToAdd = 0;

        TimeEntry.findById(id)
            .orFail(() => Error('Not found'))
            .then(result => {
                if (result.ended_at != null || result.locked_at != null) {
                    return res.status(422).json({
                        message: 'Time entry has ended or is locked.'
                    });
                }

                if (result.is_running) {
                    if (result.resumed_at == null) {
                        timeToAdd = (properties.paused_at - result.started_at) / 1000;
                    } else {
                        timeToAdd = (properties.paused_at - result.resumed_at) / 1000;
                    }

                    timeToAdd = Math.round(timeToAdd);
                } else {
                    return res.status(422).json({
                        message: 'Time entry is not running.'
                    });
                }
            })
            .then(() => TimeEntry.findByIdAndUpdate(id, {
                $inc: {
                    'time_worked': timeToAdd
                },
                $set: {
                    'is_running': false,
                    'ended_at': properties.ended_at
                },
                $unset: {
                    'paused_at': '',
                    'resumed_at': ''
                }
            }))
            .then(() => res.status(200).json({
                message: 'Success.'
            }))
            .catch(next);
    },

    lock(req, res, next) {
        const id = req.params.id;
        const properties = {
            locked_at: Date.parse(req.body.locked_at) || Date.now()
        };

        TimeEntry.findById(id)
            .orFail(() => Error('Not found'))
            .then(result => {
                if (result.locked_at != null) {
                    return res.status(422).json({
                        message: 'Time entry is already locked.'
                    });
                }

                if (result.ended_at == null) {
                    return res.status(422).json({
                        message: 'Time entry must be ended first.'
                    });
                }
            })
            .then(() => TimeEntry.findByIdAndUpdate(id, {
                $set: {
                    'locked_at': properties.locked_at
                },
                $unset: {
                    'paused_at': '',
                    'resumed_at': ''
                }
            }))
            .then(() => res.status(200).json({
                message: 'Success.'
            }))
            .catch(next);
    }
};