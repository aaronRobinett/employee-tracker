const db = require('./db/connection');
const EmployeeTracker = require('./EmployeeTracker');

//DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

const emplTracker = new EmployeeTracker(db);
emplTracker.getMenuChoices();