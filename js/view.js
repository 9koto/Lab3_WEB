class View {
    // Показати повідомлення
    showMessage(elementId, message, isError = false) {
        const element = document.getElementById(elementId);
        element.textContent = message;
        element.style.color = isError ? 'red' : 'green';
    }

    // Оновити профіль
    updateProfile(user) {
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;
        document.getElementById('profile-gender').textContent = user.gender;
        document.getElementById('profile-birthdate').textContent = user.birthdate;
    }

    // Оновити список сеансів
    updateSessions(sessions) {
        const sessionList = document.getElementById('session-list');
        sessionList.innerHTML = '';
        sessions.forEach(session => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `Назва: ${session.name}, Початок: ${session.start}, Кінець: ${session.end}, Тривалість: ${session.duration} сек`;
            sessionList.appendChild(li);
        });
    }
}