const ClientController = require('../../controllers/client_controller');

const passport = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    app.get('/api/clients', passportJWT, ClientController.index);
    app.post('/api/clients', passportJWT, ClientController.create);
    app.get('/api/clients/:id', passportJWT, ClientController.read);
    app.put('/api/clients/:id', passportJWT, ClientController.edit);
    app.delete('/api/clients/:id', passportJWT, ClientController.delete);
};