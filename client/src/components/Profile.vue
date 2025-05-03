<template>
    <div>
      <h1 class="text-center mb-4">Профіль користувача</h1>
      <table class="table table-bordered w-50 mx-auto">
        <tr><th>Ім’я</th><td>{{ user.name }}</td></tr>
        <tr><th>Email</th><td>{{ user.email }}</td></tr>
        <tr><th>Стать</th><td>{{ user.gender }}</td></tr>
        <tr><th>Дата народження</th><td>{{ user.birthdate }}</td></tr>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('currentUser')) || {},
      };
    },
  };
  </script>