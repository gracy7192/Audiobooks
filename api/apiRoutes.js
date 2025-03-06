const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.post("/login", (req, res, next) => {
    const { email, password } = req.body;

    console.log(email + " - " + password);

    fs.readFile(
        path.join(__dirname, "../models/users.json"),
        "utf-8",
        (err, data) => {
            if (err) return next(err);
            const users = JSON.parse(data);
            const user = users.find(
                (u) => u.email === email && u.password === password
            );
            if (user) {
                return res.status(200).json({ message: "Login successful" });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        }
    );
});

router.post("/register", (req, res, next) => {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    const newUser = { name, email, password };
    fs.readFile(
        path.join(__dirname, "../models/users.json"),
        "utf-8",
        (err, data) => {
            if (err) return next(err);
            let users = [];
            if (data) {
                users = JSON.parse(data);
            }
            users.push(newUser);
            fs.writeFile(
                path.join(__dirname, "../models/users.json"),
                JSON.stringify(users, null, 2),
                (err) => {
                    if (err) return next(err);
                    return res.status(201).json({ message: "User registered" });
                }
            );
        }
    );
});

module.exports = router;
