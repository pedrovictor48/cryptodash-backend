const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userSchema } = require("../models");

async function sendJWT(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password must be in the body request",
            });
        }
        const bdUser = await userSchema.findOne({ username: username });

        if (!bdUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const check = await bcrypt.compare(password, bdUser.passwordHash);

        if (!check) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: bdUser._id }, process.env.SECRET, {
            expiresIn: 10 * 60 * 60,
        });
        return res.status(200).json({ token: token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

function verifyJWT(req, res, next) {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: "Failed to authenticate" });
            }

            req.body.userId = decoded.userId;
            next();
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password must be in the body request",
            });
        }
        if (await userSchema.exists({ username: username })) {
            res.status(401).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            username: username,
            passwordHash: hash,
        });
        newUser.save();
        return res.status(200).json({ message: "Ok" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { sendJWT, verifyJWT, createUser };
