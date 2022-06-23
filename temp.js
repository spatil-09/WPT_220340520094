
const { response } = require('express');
const express = require('express');
const app = express();
const mysql2 = require('mysql2');
let dbparams = {
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'demodb',
	port: 3306
};
const con = mysql2.createConnection(dbparams);


app.use(express.static('abc'));


app.get('/getbookbyid', function (req, res) {
	let input = req.query.Bookid;
	console.log(input);
	let output = { bookstatus: false, bookdetails: {} };
	con.query('select * from book where bookid=?', [input], (error, rows) => {
		if (rows.length > 0) {
			output.bookstatus = true;
			output.bookdetails = rows[0];
		}
		console.log(rows);
		res.send(output);

	});


});//end of blur logic


app.get('/showallbooks', function (req, res) {

	con.query('select * from book', [], (error, rows) => {

		//console.log(rows);

		res.send(rows);
	});
});


app.get('/updatebookbyid', function (req, res) {

	let output = false;
	let input = { Bookid: req.query.Bookid, Bookname: req.query.Bookname, Price: req.query.Price };

	con.query('update BOOK set  bookname= ? ,  price= ? where  bookid= ?', [input.Bookname, input.Price, input.Bookid], (err, rows) => {
		if (err) {
			console.log("database error");
		}
		else if (rows.affectedRows > 0) {
			output = true;
		}


		res.send(output);

	});
});




app.listen(8081, function () {
	console.log("server listening at port 8081...");
});