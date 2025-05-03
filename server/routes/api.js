const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Реєстрація користувача
    router.post('/register', (req, res) => {
        const { name, email, gender, birthdate, password } = req.body;
        const stmt = db.prepare('INSERT INTO users (name, email, gender, birthdate, password) VALUES (?, ?, ?, ?, ?)');
        stmt.run(name, email, gender, birthdate, password, (err) => {
            if (err) return res.status(400).json({ error: 'Користувач із таким email вже існує' });
            res.status(201).json({ message: 'Реєстрація успішна' });
        });
        stmt.finalize();
    });

    // Логін користувача
    router.post('/login', (req, res) => {
        const { email, password } = req.body;
        db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, user) => {
            if (err || !user) return res.status(400).json({ error: 'Невірний email або пароль' });
            res.json(user);
        });
    });

    // Отримання сеансів користувача
    router.get('/sessions/:userId', (req, res) => {
        const userId = req.params.userId;
        db.all('SELECT * FROM sessions WHERE userId = ?', [userId], (err, sessions) => {
            if (err) return res.status(500).json({ error: 'Помилка сервера' });
            res.json(sessions);
        });
    });

    // Збереження сеансу
    router.post('/sessions', (req, res) => {
        const { userId, name, start, end, duration } = req.body;
        const stmt = db.prepare('INSERT INTO sessions (userId, name, start, end, duration) VALUES (?, ?, ?, ?, ?)');
        stmt.run(userId, name, start, end, duration, (err) => {
            if (err) return res.status(500).json({ error: 'Помилка сервера' });
            res.status(201).json({ message: 'Сеанс збережено' });
        });
        stmt.finalize();
    });

    return router;
};