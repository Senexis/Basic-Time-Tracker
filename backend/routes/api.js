const ClientRoutes = require('./api/clients');
const TagRoutes = require('./api/tags');
const TimeEntryRoutes = require('./api/time_entries');
const UserRoutes = require('./api/users');

module.exports = (app) => {
    ClientRoutes(app);
    TagRoutes(app);
    TimeEntryRoutes(app);
    UserRoutes(app);
};