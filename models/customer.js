const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    currentBalance: { type: Number, required: true, }
});

const Customer = new mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
