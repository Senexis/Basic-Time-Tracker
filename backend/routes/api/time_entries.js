const TimeEntryController = require('../../controllers/time_entry_controller');

const passport = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
    app.get('/api/time-entries', passportJWT, TimeEntryController.index);
    app.post('/api/time-entries', passportJWT, TimeEntryController.create);
    app.get('/api/time-entries/:id', passportJWT, TimeEntryController.read);
    app.put('/api/time-entries/:id', passportJWT, TimeEntryController.edit);
    app.delete('/api/time-entries/:id', passportJWT, TimeEntryController.delete);

    // app.post('/api/time-entries/lock', passportJWT, TimeEntryController.multilock);   // Allows locking multiple time entries. [Not implemented]

    app.post('/api/time-entries/:id/tag', passportJWT, TimeEntryController.tag);         // Adds or creates a tag for the time entry.
    app.post('/api/time-entries/:id/untag', passportJWT, TimeEntryController.untag);     // Remove a tag from the time entry.
    app.post('/api/time-entries/:id/pause', passportJWT, TimeEntryController.pause);     // Pauses the time entries' timer.
    app.post('/api/time-entries/:id/resume', passportJWT, TimeEntryController.resume);   // Resumes the time entries' timer if running.
    app.post('/api/time-entries/:id/stop', passportJWT, TimeEntryController.stop);       // Permanently stops the time entries' timer.
    app.post('/api/time-entries/:id/lock', passportJWT, TimeEntryController.lock);       // Locks the time entry if it's been stopped.
};