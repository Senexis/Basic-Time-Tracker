const JWT = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

signToken = user => {
    return JWT.sign({
        iss: 'time-management-system',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.jwtSecret);
}

module.exports = {
    create(req, res, next) {
        const properties = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            color: req.body.color
        };

        let foundUser, newUser;

        User.findOne({
                "local.email": properties.email
            })
            .then(result => foundUser = result)
            .then(() => {
                if (foundUser) return res.status(403).json({
                    error: 'Email is already in use.'
                });

                newUser = new User({
                    method: 'local',
                    local: {
                        email: properties.email,
                        password: properties.password
                    },
                    name: properties.name,
                    color: properties.color
                });
            })
            .then(() => newUser.save())
            .then(() => res.status(200).json({
                token: signToken(newUser)
            }))
            .catch(next);
    },

    access(req, res, next) {
        return res.status(200).json({
            token: signToken(req.user)
        });
    },

    index(req, res, next) {
        User.find({})
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
};