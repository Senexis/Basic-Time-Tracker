const Client = require('../models/client');

module.exports = {
    index(req, res, next) {
        Client.find({})
            .then(result => res.json(result))
            .catch(next);
    },

    create(req, res, next) {
        const properties = {
            author: req.user._id
        };

        if (req.body.name != null) {
            properties.name = req.body.name;
        }

        if (req.body.color != null) {
            properties.color = req.body.color;
        }

        Client.create(properties)
            .then(result => res.json(result))
            .catch(next);
    },

    read(req, res, next) {
        const id = req.params.id;

        Client.findById(id)
            .orFail(() => Error('Not found'))
            .then(result => res.json(result))
            .catch(next);
    },

    edit(req, res, next) {
        const id = req.params.id;
        const properties = {};

        if (req.body.name != null) {
            properties.name = req.body.name;
        }

        if (req.body.color != null) {
            properties.color = req.body.color;
        }

        Client.findByIdAndUpdate(id, properties, {new: true})
            .orFail(() => Error('Not found'))
            .then(result => res.json(result))
            .catch(next);
    },

    delete(req, res, next) {
        const id = req.params.id;

        Client.findByIdAndDelete(id)
            .orFail(() => Error('Not found'))
            .then(result => res.status(204).json(result))
            .catch(next);
    }
};