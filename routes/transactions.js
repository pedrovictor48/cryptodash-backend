const { transactionSchema } = require("../models");

async function createTransaction(req, res, next) {
    try {
        const newTransaction = new transactionSchema(req.body);
        await newTransaction.save();
        return res.status(200).json({ message: "Ok" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function deleteTransaction(req, res) {
    const { transactionId } = req.body;
    if (!transactionId) {
        return res
            .status(400)
            .json({ message: "Transaction ID must be provided" });
    }

    await transactionSchema.findByIdAndRemove(transactionId);
    return res.status(200).json({ message: "Ok" });
}

async function getTransaction(req, res) {
    userId = req.body.userId;
    const transactions = await transactionSchema.find({ userId: userId });
    return res.status(200).json({ message: "Ok", data: transactions });
}

module.exports = { createTransaction, getTransaction, deleteTransaction };