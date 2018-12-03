const User = require('../models/user');

module.exports = {
    index(req, res, next) {
        User.find({})
            .then(result => res.json(result))
            .catch(next);
    },

    create(req, res, next) {
        const properties = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            color: req.body.color
        };

        User.create(properties)
            .then(result => res.json(result))
            .catch(next);
    },

    read(req, res, next) {
        const id = req.params.id;

        User.findById(id)
            .orFail(() => Error('Not found'))
            .then(result => res.json(result))
            .catch(next);
    },

    edit(req, res, next) {
        const id = req.params.id;
        const properties = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            color: req.body.color
        };

        User.findByIdAndUpdate(id, properties)
            .orFail(() => Error('Not found'))
            .then(result => res.json(result))
            .catch(next);
    },

    delete(req, res, next) {
        const id = req.params.id;

        User.findByIdAndDelete(id)
            .orFail(() => Error('Not found'))
            .then(result => res.status(204).json(result))
            .catch(next);
    }
};