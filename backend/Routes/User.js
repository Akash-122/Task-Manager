const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/create-user', (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
    // res.send({status: "success", message:  "sheshron  is live guys"});
});

router.post('/add-user', (req, res) => {
    const { name, email, password } = req.body;
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ message: 'User added successfully', userId: this.lastID });
        }
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email='${email}'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            // res.json(rows);
            // console.log('rows', rows);
            if (rows && rows.password !== password) {
                res.send({message: 'credientials does not match', status: "failure"});
            } else {
                res.send({message: 'logged in', status: "success"});
            }
        }
    });
});

module.exports = router;