<template>
  <div>
    <CustomHeader />
    <div class="max-w-sm mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">Registrar</h2>
      <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nome</label>
          <input v-model="form.name" id="name" name="name" type="text" placeholder="Digite seu nome"
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
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
        <div class="flex items-center justify-between">
          <button type="submit"
            class="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">Registrar</button>
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
        name: '',
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:8000/api/register', this.form);
        this.$router.push('/login');
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Erro ao registrar. Por favor, tente novamente.';
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
