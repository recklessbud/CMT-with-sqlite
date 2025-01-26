/* eslint-disable quotes */
const db = require('../config/db');

const addContact = (firstName, lastName, phone, zip, callback) => {
	const query = `INSERT INTO contacts(firstName, lastName, phone, zip) VALUES(?, ?, ?, ?)`;
	db.connectDB.run(query, [firstName, lastName, phone, zip], (err) => {
		if (err) {
			console.log('error adding contact', err.message);
			callback(err, null);
		}
		else {
			callback(null, { id: this.lastID, firstName, lastName, phone, zip });
			console.log('contact added');
		}
	});
};

const deleteContact = (id, callback) => {
	const query = `DELETE FROM contacts WHERE id = ?`;
	db.connectDB.run(query, [id], (err) => {
		if (err) {
			console.log('error deleting contact', err.message);
			callback(err, null);
		}// eslint-disable-next-line keyword-spacing
		else if(this.changes === 0) {
			console.log('contact not found');
			callback(null, { message: 'contact not found' });
		}
		else {
			console.log('contact deleted');
			callback(null, { message: 'contact deleted' });
		}
	});
};

const updateContact = (id, firstName, lastName, phone, zip, callback) => {
	const query = `UPDATE contacts SET firstName = ?, lastName = ?, phone = ?, zip = ? WHERE id = ?`;
	db.connectDB.run(query, [firstName, lastName, phone, zip, id], (err) => {
		if (err) {
			console.log('error updating contact', err.message);
			callback(err, null);
		}
		// eslint-disable-next-line keyword-spacing
		else if(this.changes === 0) {
			console.log('contact not found');
			callback(null, { message: 'contact not found' });
		}
		else {
			console.log('contact updated');
			callback(null, { id, firstName, lastName, phone, zip });
		}
	});
};


const getPaginatedContacts = (pageNumber, pageSize, callback) => {
	const offset = (pageNumber - 1) * pageSize;
	db.connectDB.get(`SELECT COUNT(*) AS total FROM contacts`, (err, result) => {
		if (err) {
		  console.error('Error fetching total contacts:', err.message);
		  callback(err, null);
		}
		else {
		  const total = result.total;
		  const totalPages = Math.ceil(total / pageSize);

			const query = `SELECT * FROM contacts ORDER BY id DESC LIMIT ? OFFSET ?`;
			db.connectDB.all(query, [pageSize, offset], (err, rows) => {
				if (err) {
					console.log('error fetching contacts', err.message);
					callback(err, null);
				}
				else {
					callback(null, { total, totalPages, data: rows });
				}
			});
		}
	});
};
module.exports = {
	addContact,
	deleteContact,
	updateContact,
	getPaginatedContacts,
};