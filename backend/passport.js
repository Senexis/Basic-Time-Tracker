const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/user');

require('dotenv').config();

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.jwtSecret
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if (!user) return done(null, false);

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({
            "local.email": email
        });

        console.log(user);
        if (!user) return done(null, false);

        const isValid = await user.isValidPassword(password);

        console.log(isValid);
        if (!isValid) return done(null, false);

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

module.exports = passport;