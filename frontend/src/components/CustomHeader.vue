<template>
  <header class="bg-gray-800 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <div>
          <h1 class="text-3xl font-bold text-teal-400">Desafio Gazin</h1>
          <div v-if="isLoggedIn" class="relative group">
            <span class="text-lg font-semibold text-white cursor-pointer" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
              {{ truncatedName }}
            </span>
            <div v-if="showTooltip" class="absolute bottom-0 left-0 bg-black text-white text-xs rounded py-1 px-2 mt-2">
              {{ user.name }}
            </div>
          </div>
        </div>
      </div>
      <nav class="flex items-center space-x-4">
        <template v-if="isLoggedIn">
          <router-link to="/" class="nav-link" :class="{ 'router-link-active': isActive('/') }">Home</router-link>
          <router-link to="/developers" class="nav-link" :class="{ 'router-link-active': isRouteActive('/developers') }">Developers</router-link>
          <router-link to="/levels" class="nav-link" :class="{ 'router-link-active': isRouteActive('/levels') }">Levels</router-link>
          <button @click="logoutHandler" class="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300">
            Logout
          </button>
        </template>
        <template v-else>
          <router-link to="/register" class="nav-link" :class="{ 'router-link-active': isRouteActive('/register') }">Registrar</router-link>
          <router-link to="/login" class="nav-link" :class="{ 'router-link-active': isRouteActive('/login') }">Login</router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import useLogout from '../composables/useLogout';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'CustomHeader',
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('auth_token'),
      user: {
        name: ''
      },
      showTooltip: false
    };
  },
  computed: {
    truncatedName() {
      if (this.user.name.length > 15) {
        const [firstName, ...rest] = this.user.name.split(' ');
        const lastNameInitial = rest.length ? `${rest[0].charAt(0)}.` : '';
        return `${firstName} ${lastNameInitial}`;
      }
      return this.user.name;
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { logout } = useLogout();

    const isActive = (path) => route.path === path;

    const isRouteActive = (path) => route.path.startsWith(path);

    const logoutHandler = () => {
      logout();
      router.push({ name: 'Login' });
    };

    return {
      isActive,
      logoutHandler,
      isRouteActive
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get('/api/user');
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async logout() {
      try {
        await axios.post('/api/logout');
        localStorage.removeItem('auth_token');
        Cookies.remove('XSRF-TOKEN');
        this.isLoggedIn = false;
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  },
  async mounted() {
    if (this.isLoggedIn) {
      await this.fetchUserProfile();
    }
  }
};
</script>

<style scoped>
.container {
  @apply mx-auto px-4;
}

.nav-link {
  @apply text-sm text-gray-300 hover:text-teal-400 transition-colors duration-300;
}

.router-link-active {
  @apply text-teal-400 font-bold;
}

.group-hover\:block {
  display: none;
}

.group:hover .group-hover\:block {
  display: block;
}
</style>
