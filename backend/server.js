const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('./routes/api');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.databaseUri, {
	useNewUrlParser: true,
	// auth: {
	// 	user: process.env.databaseUsername,
	// 	password: process.env.databasePassword
	// }
});

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.once('open', () => {
	console.log('MongoDB connected.')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(process.env.PORT || 5000, () => {
	if (process.env.PORT !== undefined) {
		console.log(`Server started at "http://localhost:${process.env.PORT}/".`);
	} else {
		console.log(`Server started at "http://localhost:5000/".`);
	}
});

routes(app);

app.get('*', (req, res) => {
	res.status(200).send({
		message: 'Application is running'
	}).end();
});

app.use((err, req, res, next) => {
	res.status(422).send({
		error: err.message
	});
});

module.exports = app;