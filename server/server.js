const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

// Налаштування бази даних SQLite
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite database.');
});

// Створення таблиць
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        gender TEXT NOT NULL,
        birthdate TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        name TEXT NOT NULL,
        start TEXT NOT NULL,
        end TEXT NOT NULL,
        duration INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);
});

// Додаємо простий маршрут для кореня
app.get('/', (req, res) => {
    res.send('<h1>Time Tracker Server</h1><p>API is running. Use endpoints like <a href="/api">/api</a>.</p>');
});

// Використання маршрутів API
app.use('/api', apiRoutes(db));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));