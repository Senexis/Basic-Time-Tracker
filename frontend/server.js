const express = require('express'),
    path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/time-management-system'));

app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/time-management-system/index.html'));
});

app.listen(process.env.PORT || 5001, () => {
	if (process.env.PORT !== undefined) {
		console.log(`Server started at "http://localhost:${process.env.PORT}/".`);
	} else {
		console.log(`Server started at "http://localhost:5001/".`);
	}
});