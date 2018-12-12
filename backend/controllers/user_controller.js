const JWT = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

signToken = user => {
    const expires = new Date().setDate(new Date().getDate() + 1);
    const jwtToken = JWT.sign({
        iss: 'time-management-system',
        sub: user.id,
        iat: new Date().getTime(),
        exp: expires
    }, process.env.jwtSecret);

    return {
        _id: user.id,
        token: jwtToken,
        expires: expires
    };
}

module.exports = {
    create(req, res, next) {
        const properties = {
            email: req.body.email || req.body.local.email,
            password: req.body.password || req.body.local.password,
            name: req.body.name
        };

        const newUser = new User({
            method: 'local',
            local: {
                email: properties.email,
                password: properties.password
            },
            name: properties.name,
            color: properties.color
        });

        if (req.body.color != null) {
            properties.color = req.body.color;
            newUser.color = req.body.color;
        }

        let foundUser;

        User.findOne({
                "local.email": properties.email
            })
            .then(result => foundUser = result)
            .then(() => {
                if (foundUser) return res.status(403).json({
                    error: 'Email is already in use.'
                });
            })
            .then(() => newUser.save())
            .then(() => res.status(200).json(signToken(newUser)))
            .catch(next);
    },

    access(req, res, next) {
        return res.status(200).json(signToken(req.user));
    },

    index(req, res, next) {
        User.find({})
            .then(result => res.json(result))
            .catch(next);
    },

    self(req, res, next) {
        const id = req.user._id;

        User.findById(id)
            .orFail(() => Error('Not found'))
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
            password: req.body.password
        };

        if (req.body.name != null) {
            properties.name = req.body.name;
        }

        if (req.body.color != null) {
            properties.color = req.body.color;
        }

        User.findByIdAndUpdate(id, properties, {new: true})
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