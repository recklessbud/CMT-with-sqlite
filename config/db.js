// const express = require('express');
const { sqlite3, Database } = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'contacts.db');
// console.log(dbPath);

module.exports = {
	connectDB: new Database(dbPath, (err) => {
		if (err) {
			console.log('error connecting to the database', err.message);
		}
		else {
			console.log('Connected to the database');
		}
	}),
};
