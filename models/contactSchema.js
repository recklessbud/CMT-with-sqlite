const db = require('../config/db');

const createTAble = `
    CREATE TABLE contacts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        phone INTEGER UNIQUE NOT NULL,
        zip TEXT NOT NULL
    )
`;

db.connectDB.run(createTAble, (err) => {
	if (err) {
		console.log('error creating table', err.message);
	}
	else {
		console.log('table created');
	}
});

// const DropTable = `DROP TABLE contacts`

// db.connectDB.run(DropTable, (err) => {
//     if (err) {
//         console.log('error deleting table', err.message);
//     } else {
//         console.log('table deleted');
//     }
// })