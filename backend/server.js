const bodyParser = require('body-parser'),
	cors = require('cors'),
	express = require('express'),
	mongoose = require('mongoose'),
	routes = require('./routes/api');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cors());

const databaseUri = process.env.databaseUri;

mongoose.Promise = global.Promise;
mongoose.connect(databaseUri, {
	useCreateIndex: true,
	useNewUrlParser: true,
	auth: {
		user: process.env.databaseUsername,
		password: process.env.databasePassword
	}
}, (err) => {
	if (err) {
		return console.error('Error connecting to "%s":', databaseUri, err);
	}

	console.log('Connected successfully to "%s".', databaseUri);
});

routes(app);

app.get('*', (req, res) => {
	res.status(404).json({
		error: "Not found"
	});
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: err.message });
});

app.listen(process.env.PORT || 5000, () => {
	if (process.env.PORT !== undefined) {
		console.log(`Server started at "http://localhost:${process.env.PORT}/".`);
	} else {
		console.log(`Server started at "http://localhost:5000/".`);
	}
});

module.exports = app;