const express = require("express");

const port = 3001;

const app = express();

app.use(express.json());

app.listen(port, (err) => {
	if (err) {
		console.error("Server could not start:", err);
		return;
	}
	console.log("Listening on port:", port);
});
