const express = require("express");
const path = require("path");
const fs = require("fs");
const Customer = require("./models/customer");
const Transaction = require("./models/transaction");
const app = express();
const http = require("http").createServer(app);
// Bootstrap models
const models = path.join(__dirname, "models");
fs.readdirSync(models)
.filter((file) => ~file.search(/^[^.].*\.js$/))
.forEach((file) => require(path.join(models, file)));
// Database
require("./mongoose");
// Static Directpry
const assetsDirectoryPath = path.join(__dirname, "./views");
app.use(express.static(assetsDirectoryPath));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/customers", async (req, res) => {
    const s = await Customer.find();
    res.send(s)
});

app.get("/customers/:id", async (req, res) => {
    const s = await Customer.findById(req.params.id);
    res.send(s)
});

app.get("/addcustomer/:name", async (req, res) => {
    const s = new Customer({ name: req.params.name, email: req.params.name + "@gmail.com", currentBalance: 1 });
    await s.save();
    res.send('added ' + req.params.name)
});

app.post("/transfer", async (req, res) => {
    const s = new Transaction({ from: req.body.from, to: req.body.to, amount: req.body.amount });
    const from = await Customer.findById(req.body.from)
    const to = await Customer.findById(req.body.to)
    from.currentBalance -= req.body.amount;
    to.currentBalance += req.body.amount;
    await to.save();
    await from.save();
    await s.save();
    res.send(s)
});


app.get("/transfers", async (req, res) => {
    const s = await Transaction.find().populate('to from').exec();
    res.send(s)
});

app.get("/refill", async (req, res) => {
    await Customer.updateMany({},{currentBalance:10000})
    res.send("bank balance updated")
});

const port = process.env.PORT || 3000;
http.listen(port, async () => {
    console.log("Server running on port " + port);
    
});