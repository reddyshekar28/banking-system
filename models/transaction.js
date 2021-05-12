const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	from: {
		type: mongoose.Types.ObjectId,
		ref: "Customer",
		required: true,
	},
	to: {
		type: mongoose.Types.ObjectId,
		ref: "Customer",
		required: true,
	},
    amount:{
        type:Number,
        required:true,
    }
});

const Transaction = new mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
