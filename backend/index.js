const express = require('express');

const db = require('./db');
const UserRoutes = require('./Routes/User');
const TodoRoutes = require('./Routes/TODO');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js API!!!!!');
});

db.serialize(() => {
    const deleteTableQuery = "DROP TABLE IF EXISTS TODO";

// Execute the query
// db.run(deleteTableQuery, function(err) {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log("Table deleted successfully");
//     }
// });
    db.run("CREATE TABLE IF NOT EXISTS users (name text, email TEXT PRIMARY KEY, password TEXT)");
    db.run(`
    CREATE TABLE IF NOT EXISTS TODO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category INTEGER,
        name TEXT,
        user TEXT,
        date Date,
        FOREIGN KEY (user) REFERENCES users(email)
    )
`);

});

app.use('/users', UserRoutes);
app.use('/todos', TodoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
