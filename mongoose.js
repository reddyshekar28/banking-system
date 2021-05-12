const mongoose = require("mongoose");
const url = "mongodb+srv://reddy:Red123456@cluster0.lgjjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

mongoose.connection.once("open", () => {
	console.log("Connected to the Database.");
});