const express = require('express');
const db = require('../db');
const router = express.Router();
const categories = require('../constants/categories');

router.get('/fetch-todo', (req, res) => {
    const user = req.query.user;
    db.all(`SELECT * FROM TODO WHERE user='${user}'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('todos', rows);
            res.json(rows);
        }
    });
});

router.get('/filtered-todos', (req, res) => {
    const category = req.query.category;
    const user = req.query.user;
    // console.log(`SELECT * FROM TODO WHERE user='${user}' AND category=${category}`);
    db.all(`SELECT * FROM TODO WHERE user='${user}' AND category=${category}`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('todos', rows);
            res.json(rows);
        }
    });
});

router.get('/sorted-todo-on-name', (req, res) => {
    const category = req.query.category;
    const user = req.query.user;
    let query = `SELECT * FROM TODO WHERE user='${user}'`;
    if (category !== null && category !== undefined) {
        query += ` AND category=${category}`;
    }
    // console.log('query', query);
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('todos', rows);
            rows.sort((a,b) => a.name.localeCompare(b.name));
            console.log('todos', rows);
            res.json(rows);
        }
    });
});

router.get('/sorted-todo-on-date', (req, res) => {
    const category = req.query.category;
    const user = req.query.user;
    let query = `SELECT * FROM TODO WHERE user='${user}'`;
    if (category !== null && category !== undefined) {
        query += ` AND category=${category}`;
    }
    // console.log('query', query);
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('todos', rows);
            rows.sort((a,b) => new Date(a.date) - new Date(b.date));
            console.log('todos', rows);
            res.json(rows);
        }
    });
});

router.get('/fetch-todo-categories', (req, res) => {
    res.send({categories: categories});
});

router.post('/add-todo', (req, res) => {
    const { name, user, dateAdded, category, date } = req.body;
    console.log('name-email', name, user, dateAdded, category);
    // Assuming you have a 'TODO' table with columns 'name' and 'status' (for example)
    db.run("INSERT INTO TODO (name, user, category, date) VALUES (?, ?, ?, ?)", [name, user, category, date], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ message: 'Task added successfully' });
        }
    });
});

router.put('/edit-todo/:id', (req, res) => {
    const toUpdateTodId = req.params.id;
    const { name } = req.body;
    db.run('UPDATE TODO SET name=?  WHERE id=?;', [name, toUpdateTodId], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ message: 'Task updated successfully' });
        }
    });
    // console.log('toUpdateTodId', toUpdateTodId, 'name', name);
});


router.delete('/delete-todo/:id', (req, res) => {
    const idToDelete = req.params.id;
    const { name } = req.body;
    // Check if the todo item exists
    db.run("DELETE FROM TODO WHERE id = ?", idToDelete, function(err) {
        if (err) {
            return console.error('Error deleting row:', err.message);
        }
        console.log(`Row(s) deleted: ${this.changes}`);
    });    
});


module.exports = router;