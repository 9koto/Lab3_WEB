<template>
    <div class="d-flex flex-column min-vh-100">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <router-link class="navbar-brand" to="/">Time Tracker</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><router-link class="nav-link" to="/">Вхід</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/register">Реєстрація</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/profile">Профіль</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/about">Про додаток</router-link></li>
              <li class="nav-item"><router-link class="nav-link" to="/dashboard">Облік часу</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="container my-5 flex-grow-1">
        <router-view></router-view>
      </main>
      <footer class="bg-dark text-white text-center py-3 mt-auto">
        <p>© 2025 Time Tracker. Усі права захищено.</p>
      </footer>
    </div>
  </template>
  
  <style>
  body {
    background-image: url('https://images.unsplash.com/photo-1501139083538-0139583c0608');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  main {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    padding: 20px;
  }
  .navbar {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .navbar-brand {
    font-size: 2rem;
    font-weight: bold;
  }
  .nav-link {
    color: #fff !important;
  }
  .nav-link:hover {
    color: #ffd700 !important;
  }
  </style>