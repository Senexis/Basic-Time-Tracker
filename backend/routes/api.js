const ClientController = require('../controllers/client_controller');
const TagController = require('../controllers/tag_controller');
const TimeEntryController = require('../controllers/time_entry_controller');
const UserController = require('../controllers/user_controller');

module.exports = (app) => {
    // Client endpoints
    app.get('/api/clients', ClientController.index);
    app.post('/api/clients', ClientController.create);
    app.get('/api/clients/:id', ClientController.read);
    app.put('/api/clients/:id', ClientController.edit);
    app.delete('/api/clients/:id', ClientController.delete);

    // Tag endpoints
    app.get('/api/tags', TagController.index);
    app.post('/api/tags', TagController.create);
    app.get('/api/tags/:id', TagController.read);
    app.put('/api/tags/:id', TagController.edit);
    app.delete('/api/tags/:id', TagController.delete);

    // TimeEntry endpoints
    app.get('/api/time-entries', TimeEntryController.index);
    app.post('/api/time-entries', TimeEntryController.create);
    app.get('/api/time-entries/:id', TimeEntryController.read);
    app.put('/api/time-entries/:id', TimeEntryController.edit);
    app.delete('/api/time-entries/:id', TimeEntryController.delete);

    app.post('/api/time-entries/lock', TimeEntryController.multilock);

    app.post('/api/time-entries/:id/pause', TimeEntryController.pause);
    app.post('/api/time-entries/:id/resume', TimeEntryController.resume);
    app.post('/api/time-entries/:id/stop', TimeEntryController.stop);
    app.post('/api/time-entries/:id/lock', TimeEntryController.lock);

    // User endpoints
    app.get('/api/users', UserController.index);
    app.post('/api/users', UserController.create);
    app.get('/api/users/:id', UserController.read);
    app.put('/api/users/:id', UserController.edit);
    app.delete('/api/users/:id', UserController.delete);
};