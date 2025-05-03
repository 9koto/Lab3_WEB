class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        // Реєстрація
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const user = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    gender: document.getElementById('gender').value,
                    birthdate: document.getElementById('birthdate').value,
                    password: document.getElementById('password').value
                };
                this.model.registerUser(user);
                this.view.showMessage('register-message', 'Реєстрація успішна!', false);
            });
        }

        // Логін
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                if (this.model.loginUser(email, password)) {
                    window.location.href = 'dashboard.html';
                } else {
                    this.view.showMessage('login-message', 'Невірний email або пароль', true);
                }
            });
        }

        // Профіль
        if (window.location.pathname.includes('profile.html')) {
            const user = this.model.getCurrentUser();
            if (user) {
                this.view.updateProfile(user);
            } else {
                window.location.href = 'index.html';
            }
        }

        // Облік часу
        if (window.location.pathname.includes('dashboard.html')) {
            this.initTimer();
            this.view.updateSessions(this.model.getSessions());
        }
    }

    initTimer() {
        let startTime = null;
        let timerInterval = null;

        const startButton = document.getElementById('start-timer');
        const pauseButton = document.getElementById('pause-timer');
        const stopButton = document.getElementById('stop-timer');
        const sessionNameInput = document.getElementById('session-name');
        const timerDisplay = document.getElementById('timer-display');

        startButton.addEventListener('click', () => {
            if (!timerInterval) {
                startTime = new Date();
                timerInterval = setInterval(() => {
                    const now = new Date();
                    const elapsed = Math.floor((now - startTime) / 1000);
                    timerDisplay.textContent = `Час: ${elapsed} сек`;
                }, 1000);
            }
        });

        pauseButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
        });

        stopButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            const endTime = new Date();
            const elapsed = Math.floor((endTime - startTime) / 1000);
            const session = {
                name: sessionNameInput.value || 'Сеанс',
                start: startTime.toLocaleString(),
                end: endTime.toLocaleString(),
                duration: elapsed
            };
            this.model.saveSession(session);
            this.view.updateSessions(this.model.getSessions());
            timerDisplay.textContent = 'Час: 0 сек';
        });
    }
}