<template>
    <div>
      <h1 class="text-center mb-4">Вхід до сайту</h1>
      <form @submit.prevent="login" class="w-50 mx-auto">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Введіть ваш email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Введіть пароль" required>
        </div>
        <button type="submit" class="btn btn-primary">Увійти</button>
        <p v-if="message" :class="error ? 'text-danger' : 'text-success'" class="mt-3 text-center">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        message: '',
        error: false,
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/api/login', {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          this.$router.push('/dashboard');
        } catch (error) {
          this.message = error.response?.data?.error || 'Помилка сервера';
          this.error = true;
        }
      },
    },
  };
  </script>