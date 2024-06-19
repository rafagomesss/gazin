<template>
  <div>
    <CustomHeader />
    <div class="max-w-sm mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input v-model="form.email" id="email" name="email" type="email" placeholder="Digite seu email"
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
          <input v-model="form.password" id="password" name="password" type="password" placeholder="Digite sua senha"
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-500">
          {{ errorMessage }}
        </div>
        <div class="flex items-center justify-between">
          <button type="submit"
            class="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CustomHeader from '@/components/CustomHeader.vue';
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', this.form);
        localStorage.setItem('auth_token', response.data.token);
        this.$router.push('/');
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Erro ao fazer login. Por favor, tente novamente.';
        } else {
          this.errorMessage = 'O backend está indisponível. Por favor, tente novamente mais tarde.';
        }
      }
    },
  },
  components: {
    CustomHeader
  }
};
</script>
