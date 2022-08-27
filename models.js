const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
});

const transactionSchema = new mongoose.Schema({
    date: Date,
    currencyId: String,
    currencyAmount: Number,
    cashAmount: Number,
    userId: String,
});

module.exports = {
    userSchema: mongoose.model("user", userSchema),
    transactionSchema: mongoose.model("transaction", transactionSchema),
};
