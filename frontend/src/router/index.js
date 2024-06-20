import { createRouter, createWebHistory } from 'vue-router';
import isAuthenticated from '@/middleware/authenticated';

import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import LoginView from '../views/auth/LoginView.vue';
import DeveloperView from '../views/developer/DeveloperView.vue';
import LevelView from '../views/level/LevelView.vue';
import DeveloperFormView from '../views/developer/DeveloperFormView.vue';
import LevelFormView from '../views/level/LevelFormView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/register', name: 'Register', component: RegisterView, beforeEnter: isAuthenticated },
  { path: '/login', name: 'Login', component: LoginView, beforeEnter: isAuthenticated },
  { path: '/developers', name: 'Developers', component: DeveloperView, meta: { requiresAuth: true } },
  { path: '/levels', name: 'Levels', component: LevelView, meta: { requiresAuth: true } },
  { path: '/developers/new', name: 'NewDeveloper', component: DeveloperFormView, meta: { requiresAuth: true } },
  { path: '/developers/:id', name: 'EditDeveloper', component: DeveloperFormView, props: true, meta: { requiresAuth: true } },
  { path: '/levels/new', name: 'NewLevel', component: LevelFormView, meta: { requiresAuth: true } },
  { path: '/levels/:id', name: 'EditLevel', component: LevelFormView, props: true, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('auth_token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
