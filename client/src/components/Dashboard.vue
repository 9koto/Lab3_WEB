<template>
    <div>
      <h1 class="text-center mb-4">Облік робочого часу</h1>
      <div class="w-50 mx-auto">
        <div class="mb-3">
          <label for="session-name" class="form-label">Назва сеансу</label>
          <input v-model="sessionName" type="text" class="form-control" id="session-name" placeholder="Введіть назву сеансу">
        </div>
        <div class="mb-3 text-center">
          <h3>{{ timerDisplay }}</h3>
        </div>
        <div class="text-center mb-3">
          <button @click="startTimer" class="btn btn-success me-2">Старт</button>
          <button @click="pauseTimer" class="btn btn-warning me-2">Пауза</button>
          <button @click="stopTimer" class="btn btn-danger">Стоп</button>
        </div>
        <h4>Список сеансів</h4>
        <ul class="list-group">
          <li v-for="session in sessions" :key="session.id" class="list-group-item">
            Назва: {{ session.name }}, Початок: {{ session.start }}, Кінець: {{ session.end }}, Тривалість: {{ session.duration }} сек
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        sessionName: '',
        startTime: null,
        timerInterval: null,
        elapsedTime: 0,
        sessions: [],
        user: JSON.parse(localStorage.getItem('currentUser')) || {},
      };
    },
    computed: {
      timerDisplay() {
        return `Час: ${this.elapsedTime} сек`;
      },
    },
    methods: {
      async startTimer() {
        if (!this.timerInterval) {
          this.startTime = new Date();
          this.timerInterval = setInterval(() => {
            const now = new Date();
            this.elapsedTime = Math.floor((now - this.startTime) / 1000);
          }, 1000);
        }
      },
      pauseTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      },
      async stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        const endTime = new Date();
        const duration = Math.floor((endTime - this.startTime) / 1000);
        const session = {
          userId: this.user.id,
          name: this.sessionName || 'Сеанс',
          start: this.startTime.toLocaleString(),
          end: endTime.toLocaleString(),
          duration,
        };
        await axios.post('http://localhost:3000/api/sessions', session);
        this.fetchSessions();
        this.elapsedTime = 0;
      },
      async fetchSessions() {
        const response = await axios.get(`http://localhost:3000/api/sessions/${this.user.id}`);
        this.sessions = response.data;
      },
    },
    mounted() {
      this.fetchSessions();
    },
  };
  </script>