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

    app.post('/api/time-entries/lock', TimeEntryController.multilock);      // Allows locking multiple time entries.

    app.post('/api/time-entries/:id/tag', TimeEntryController.tag);         // Adds or creates a tag for the time entry.
    app.post('/api/time-entries/:id/untag', TimeEntryController.untag);     // Remove a tag from the time entry.
    app.post('/api/time-entries/:id/pause', TimeEntryController.pause);     // Pauses the time entries' timer.
    app.post('/api/time-entries/:id/resume', TimeEntryController.resume);   // Resumes the time entries' timer if running.
    app.post('/api/time-entries/:id/stop', TimeEntryController.stop);       // Permanently stops the time entries' timer.
    app.post('/api/time-entries/:id/lock', TimeEntryController.lock);       // Locks the time entry if it's been stopped.

    // User endpoints
    app.get('/api/users', UserController.index);
    app.post('/api/users', UserController.create);
    app.get('/api/users/:id', UserController.read);
    app.put('/api/users/:id', UserController.edit);
    app.delete('/api/users/:id', UserController.delete);
};