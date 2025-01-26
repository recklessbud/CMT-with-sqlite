const express = require('express');
// const { sqlite3, Database } = require('sqlite3').verbose();
// const dbPAth = './products.db'
// const homeRoute = require('./routes/homeRoute')
const contactRoute = require('./routes/contactRoutes');
const MethodOverride = require('method-override');

const PORT = 3000;
const app = express();
const connectDB = require('./config/db');
// require('./models/contactSchema')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(MethodOverride('_method'));


// app.use('/', homeRoute)
app.use('/', contactRoute);


process.on('SIGINT', () => {
	console.log('Shutting down...............................');
	connectDB.close();
	process.exit(1);
});

app.listen(PORT, () => {
	console.log(`we connected at ${PORT}`);
});
