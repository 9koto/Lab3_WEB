class Model {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    }

    // Реєстрація користувача
    registerUser(user) {
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Логін користувача
    loginUser(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    }

    // Отримання поточного користувача
    getCurrentUser() {
        return this.currentUser;
    }

    // Збереження сеансу роботи
    saveSession(session) {
        this.sessions.push(session);
        localStorage.setItem('sessions', JSON.stringify(this.sessions));
    }

    // Отримання всіх сеансів
    getSessions() {
        return this.sessions;
    }

    // Вихід користувача
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}