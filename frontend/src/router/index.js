import { createRouter, createWebHistory } from 'vue-router';
import isAuthenticated from '@/middleware/authenticated';

import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import DeveloperView from '../views/DeveloperView.vue';
import LevelView from '../views/LevelView.vue';
import DeveloperFormView from '../views/DeveloperFormView.vue';
import LevelFormView from '../views/LevelFormView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/register', name: 'Register', component: RegisterView, beforeEnter: isAuthenticated },
  { path: '/login', name: 'Login', component: LoginView, beforeEnter: isAuthenticated },
  { path: '/developers', name: 'Developers', component: DeveloperView },
  { path: '/levels', name: 'Levels', component: LevelView },
  { path: '/developers/new', name: 'NewDeveloper', component: DeveloperFormView },
  { path: '/developers/:id', name: 'EditDeveloper', component: DeveloperFormView, props: true },
  { path: '/levels/new', name: 'NewLevel', component: LevelFormView },
  { path: '/levels/:id', name: 'EditLevel', component: LevelFormView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
