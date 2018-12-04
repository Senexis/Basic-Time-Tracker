const UserController = require('../../controllers/user_controller');

const passport = require('../../passport');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    app.route('/api/users/sign-up')
        .all(UserController.create);

    app.route('/api/users/sign-in')
        .all(passportSignIn, UserController.access);

    app.get('/api/users', passportJWT, UserController.index);
    app.get('/api/users/:id', passportJWT, UserController.read);
    app.put('/api/users/:id', passportJWT, UserController.edit);
};