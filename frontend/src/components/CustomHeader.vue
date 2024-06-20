<template>
  <header class="bg-gray-800 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-teal-400">Desafio Gazin</h1>
        <h2 class="text-lg text-gray-300">Rafael Gomes</h2>
      </div>
      <nav class="flex items-center space-x-4">
        <template v-if="isLoggedIn">
          <router-link to="/" class="nav-link" :class="{ 'active-link': isActive('/') }">Home</router-link>
          <router-link to="/developers" class="nav-link" :class="isRouteActive('/developers')">Developers</router-link>
          <router-link to="/levels" class="nav-link" :class="isRouteActive('/levels')">Levels</router-link>
          <button @click="logoutHandler"
            class="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300">
            Logout
          </button>
        </template>
        <template v-else>
          <router-link to="/register" class="nav-link" :class="isRouteActive('/register')">Registrar</router-link>
          <router-link to="/login" class="nav-link" :class="isRouteActive('/login')">Login</router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useLogout from '../composables/useLogout';

export default {
  name: 'CustomHeader',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { logout } = useLogout();
    const isLoggedIn = ref(!!localStorage.getItem('auth_token'));

    const isActive = (path) => {
      return route.path === path;
    };

    const isRouteActive = (path) => {
      return route.path.startsWith(path) ? 'router-link-active' : '';
    };

    const logoutHandler = () => {
      logout();
      router.push({ name: 'Login' });
    };

    return {
      isLoggedIn,
      isActive,
      logoutHandler,
      isRouteActive,
    };
  },
};
</script>

<style scoped>
.container {
  @apply mx-auto px-4;
}

.router-link {
  @apply text-sm text-gray-300 hover:text-teal-400 transition-colors duration-300;
}

.router-link-active {
  @apply text-teal-400 font-bold;
}
</style>
