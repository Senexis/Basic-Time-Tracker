const TagController = require('../../controllers/tag_controller');

const passport = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    app.get('/api/tags', passportJWT, TagController.index);
    app.post('/api/tags', passportJWT, TagController.create);
    app.get('/api/tags/:id', passportJWT, TagController.read);
    app.put('/api/tags/:id', passportJWT, TagController.edit);
    app.delete('/api/tags/:id', passportJWT, TagController.delete);
};