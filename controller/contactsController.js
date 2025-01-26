const { addContact, deleteContact, updateContact, getPaginatedContacts } = require('../services/contactServices');
// const db = require('../config/db');

const getContacts = (req, res) => {
	const pageNumber = parseInt(req.query.page) || 1;
	const pageSize = parseInt(req.query.size) || 5;
	getPaginatedContacts(pageNumber, pageSize, (err, result) => {
		if (err) {
			console.log(err);
		}
		const { total, totalPages, data } = result;
		res.status(200).render('index', { data, currentPage: pageNumber, totalPages, pageSize, total });

	});
};


const createContact = (req, res) => {
	const { firstName, lastName, phone, zip } = req.body;
	if (!firstName || !lastName || !phone || !zip) {
		res.status(400).json({ message: 'All fields are required' });
	}
	else {
		addContact(firstName, lastName, phone, zip, (err, data) => {
			if (err) {
				res.status(500).json({ message: 'Internal server error' });
			}
			else {
				res.status(201).json({ data });
			}
		});
	};
};

const deleteContacts = (req, res) => {
	const { id } = req.params;

	deleteContact(id, (err) => {
		if (err) {
			res.status(500).json({ message: 'Internal server error' });
		}
		else {
			res.status(200).redirect('/');
		}
	});
};


const updateContacts = (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, phone, zip } = req.body;

	updateContact(id, firstName, lastName, phone, zip, (err, result) => {
		if (err) {
			res.status(500).json({ message: 'Internal server error' });
		}
		else {
			res.status(200).json({ message: 'Contact updated', result });
		}
	});
};


module.exports = {
	getContacts,
	// eslint-disable-next-line indent
    createContact,
	deleteContacts,
	updateContacts,
};

// const db = new Database(dbPAth, (err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('Connected to the database')
// })

// app.get('/products', (req, res)=>{
//     db.all('SELECT * FROM products WHERE id > 1 LIMIT 4 offset 1', (err, rows)=>{
//         if (err) {
//         console.log(err)
//         res.status(500).json({message: 'INternal server error'})
//         }
//         console.log("fetched successfully")
//        res.send(rows)
//     })
// })

// app.get('/products/:id', (req, res)=>{
//     const id = req.params.id
//     if(!id){
//         console.log("not id")
//     }

//     db.get('SELECT * FROM products WHERE id = ?', [id], (err, rows)=>{
//         if(err){
//             console.log(`err: ${err}`)
//             res.status(500).json({message: "INternal server error"})
//         }else if (!rows){
//             console.log("couldnt fetch")
//         }
//          console.log("single item fetched")
//         res.send(rows)
//     })
// })

// app.post('/products', (req, res)=>{
//     const {name, price} = req.body
//     if(!name || !price){
//         console.log("fields are required")
//     }
//     const sql = 'INSERT INTO products(name, price) VALUES (?, ?)';
//     db.run(sql, [name, price], (err, rows)=>{
//         if(err){
//             console.error(err)
//             res.status(500).json({message: "INternal server error"})
//         }
//          const id = this.LastID
//          res.status(201).send({id, name, price})
//         console.log("created")
//     })
// })


// app.put('/products/:id', (req, res) => {
//     const {id} = req.params;
//     const {name, price} = req.body

//     if(!name || !price){
//         console.log("fields are required")
//     }
//     const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
//     db.run(sql, [name, price, id], function(err){
//         if(err){
//             console.error(err)
//             res.status(500).json({message: "INternal server error"})
//         }else if(this.changes === 0){
//             console.log("no changes made")
//         }
//         res.status(200).send({id, name, price})
//         console.log("updated ")
//     })

// })


// app.delete('/products/:id', (req, res) => {
//     const {id} = req.params;
//     // const {name, price} = req.body
//     const sql = 'DELETE FROM products WHERE id = ?';
//     db.run(sql, [id], function(err, rows){
//         if(err){
//             console.error(err)
//             res.status(500).json({message: "INternal server error"})
//         }else if(this.changes === 0){
//             console.log("no changes made")
//         }
//         res.status(200).send(rows)
//         console.log("DELETED")
//     })

// })

