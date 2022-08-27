const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const { sendJWT, createUser, verifyJWT } = require("./routes/jwt");
const {
    createTransaction,
    getTransaction,
    deleteTransaction,
} = require("./routes/transactions");

app.post("/login", sendJWT);
app.post("/signup", createUser);
app.post("/newtransaction", verifyJWT, createTransaction);
app.post("/deletetransaction", verifyJWT, deleteTransaction);
app.get("/transactions", verifyJWT, getTransaction);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
