<template>
  <div>
    <CustomHeader />
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold">Desafio Gazin</h1>
        <h2 class="text-xl">Rafael Gomes</h2>
        <div class="mt-4">
          <h3 class="text-lg font-semibold">Telas Disponíveis:</h3>
          <ul class="list-inside mt-2 list-none">
            <li><router-link v-if="isLoggedIn" to="/developers" class="link-style">Developers</router-link></li>
            <li><router-link v-if="isLoggedIn" to="/levels" class="link-style">Levels</router-link></li>
            <li><router-link v-if="!isLoggedIn" to="/register" class="link-style">Register</router-link></li>
            <li><router-link v-if="!isLoggedIn" to="/login" class="link-style">Login</router-link></li>
            <li><router-link v-if="isLoggedIn" to="/logout" class="link-style">Logout</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomHeader from '../components/CustomHeader.vue';

export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('auth_token'), // Inicializa com base no token de autenticação
    };
  },
  components: {
    CustomHeader,
  },
};
</script>

<style scoped>

.link-style {
  @apply block py-2 px-4 text-center text-teal-400 no-underline transition-colors duration-300; /* Estilo base */
}

.link-style:hover {
  @apply bg-teal-400 text-white; /* Cor de fundo no hover */
}

</style>
