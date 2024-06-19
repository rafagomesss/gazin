<template>
  <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div>
      <h1 class="text-2xl">Desafio Gazin</h1>
      <h2 class="text-xl">Rafael Gomes</h2>
    </div>
    <nav class="flex items-center">
      <router-link :to="{ name: 'Home' }" v-if="isLoggedIn" class="px-4" :class="linkClasses('Home')">Home</router-link>
      <router-link :to="{ name: 'Developers' }" v-if="isLoggedIn" class="px-4" :class="linkClasses('Developers')">Developers</router-link>
      <router-link :to="{ name: 'Levels' }" v-if="isLoggedIn" class="px-4" :class="linkClasses('Levels')">Levels</router-link>
      <router-link :to="{ name: 'Register' }" v-if="!isLoggedIn" class="px-4" :class="linkClasses('Register')">Register</router-link>
      <router-link :to="{ name: 'Login' }" v-if="!isLoggedIn" class="px-4" :class="linkClasses('Login')">Login</router-link>
      <button @click="logout" v-if="isLoggedIn" class="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Logout</button>
    </nav>
  </header>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRoute } from 'vue-router';

export default {
  name: 'CustomHeader',
  setup() {
    const route = useRoute();

    const linkClasses = (routeName) => ({
      'px-4': true,
      'text-teal-400': true, // Cor do texto normal
      'text-white': route.name === routeName, // Cor do texto quando link ativo
      'bg-teal-900': route.name === routeName, // Cor de fundo quando link ativo
      'hover:bg-teal-400': route.name !== routeName && !routeName.includes('logout'), // Cor de fundo no hover quando não ativo
      'font-bold': route.name === routeName, // Texto em negrito quando ativo
    });

    return {
      linkClasses,
    };
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('auth_token'), // Inicializa com base no token de autenticação
    };
  },
  methods: {
    async logout() {
      try {
        await axios.post('http://localhost:8000/api/logout');
        localStorage.removeItem('auth_token');
        Cookies.remove('XSRF-TOKEN', { path: '/' });
        Cookies.remove('laravel_session');
        this.isLoggedIn = false;
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao fazer logout. Por favor, tente novamente.');
      }
    },
  },
};
</script>