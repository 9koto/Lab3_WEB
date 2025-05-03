<template>
    <div>
      <h1 class="text-center mb-4">Реєстрація користувача</h1>
      <form @submit.prevent="register" class="w-50 mx-auto">
        <div class="mb-3">
          <label for="name" class="form-label">Ім’я</label>
          <input v-model="name" type="text" class="form-control" id="name" placeholder="Введіть ваше ім’я" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Введіть ваш email" required>
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Стать</label>
          <select v-model="gender" class="form-select" id="gender" required>
            <option value="male">Чоловік</option>
            <option value="female">Жінка</option>
            <option value="other">Інше</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="birthdate" class="form-label">Дата народження</label>
          <input v-model="birthdate" type="date" class="form-control" id="birthdate" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Введіть пароль" required>
        </div>
        <button type="submit" class="btn btn-primary">Зареєструватися</button>
        <p v-if="message" :class="error ? 'text-danger' : 'text-success'" class="mt-3 text-center">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        gender: '',
        birthdate: '',
        password: '',
        message: '',
        error: false,
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:3000/api/register', {
            name: this.name,
            email: this.email,
            gender: this.gender,
            birthdate: this.birthdate,
            password: this.password,
          });
          this.message = response.data.message;
          this.error = false;
        } catch (error) {
          this.message = error.response?.data?.error || 'Помилка сервера';
          this.error = true;
        }
      },
    },
  };
  </script>