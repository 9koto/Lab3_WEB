import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Profile from './components/Profile.vue';
import About from './components/About.vue';
import Dashboard from './components/Dashboard.vue';

const routes = [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile },
    { path: '/about', component: About },
    { path: '/dashboard', component: Dashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (to.path !== '/' && to.path !== '/register' && to.path !== '/about' && !user) {
        return next('/');
    }
    next();
});

export default router;