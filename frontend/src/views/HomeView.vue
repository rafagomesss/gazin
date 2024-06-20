<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <CustomHeader />
    <main class="flex flex-1 flex-col items-center justify-center p-6">
      <div class="text-center mb-10">
        <h1 class="text-5xl font-bold text-teal-600 mb-2">Desafio Gazin</h1>
        <h2 class="text-2xl text-gray-700">Rafael Gomes</h2>
      </div>
      <div class="max-w-2xl w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">Telas Disponíveis</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li>
              <router-link v-if="isLoggedIn" to="/developers" class="link-card">Developers</router-link>
            </li>
            <li>
              <router-link v-if="isLoggedIn" to="/levels" class="link-card">Levels</router-link>
            </li>
            <li>
              <router-link v-if="!isLoggedIn" to="/register" class="link-card">Register</router-link>
            </li>
            <li>
              <router-link v-if="!isLoggedIn" to="/login" class="link-card">Login</router-link>
            </li>
            <li>
              <button v-if="isLoggedIn" @click="logout" class="w-full link-card">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2024 Desafio Gazin. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue';
import CustomHeader from '../components/CustomHeader.vue';
import useLogout from '../composables/useLogout';


export default {
  setup() {
    const { logout } = useLogout();
    const isLoggedIn = computed(() => !!localStorage.getItem('auth_token'));

    return { logout, isLoggedIn };
  },
  components: {
    CustomHeader,
  },
};
</script>

<style scoped>
.link-card {
  @apply block py-4 px-6 text-center text-gray-700 bg-gray-100 rounded-lg shadow-sm transition-transform transform hover:-translate-y-1 hover:shadow-md border border-gray-200;
}

.link-card:hover {
  @apply bg-teal-400 text-white border-teal-400;
}
</style>
