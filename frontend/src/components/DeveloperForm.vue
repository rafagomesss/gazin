<template>
  <div class="max-w-3xl mx-auto mt-8">
    <h2 class="text-2xl font-bold mb-4">{{ isEditMode ? 'Editar Desenvolvedor' : 'Cadastrar Desenvolvedor' }}</h2>
    <form @submit.prevent="saveDeveloper" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Nome</label>
        <input v-model="developer.name" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Sexo</label>
        <select v-model="developer.gender" id="gender" name="gender" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Dt. Nascimento</label>
        <input type="date" v-model="developer.birthdate" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Hobby</label>
        <input v-model="developer.hobby" class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Nível</label>
        <select v-model="developer.level_id" class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option v-for="level in levels" :key="level.id" :value="level.id">{{ level.level }}</option>
        </select>
      </div>
      <div v-if="errorMessage" class="mb-4 text-red-500">
        {{ errorMessage }}
      </div>
      <div class="flex items-center justify-end">
        <button @click="goBack" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Voltar</button>
        <button type="submit" class="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    developerId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      developer: {
        name: '',
        gender: '',
        birthdate: '',
        hobby: '',
        level_id: ''
      },
      levels: [],
      isEditMode: false,
      errorMessage: '',
    };
  },
  methods: {
    fetchLevels() {
      axios.get('http://localhost:8000/api/levels')
        .then(response => {
          this.levels = response.data;
        })
        .catch(error => {
          console.error('Error fetching levels:', error);
        });
    },
    fetchDeveloper() {
      if (this.developerId) {
        axios.get(`http://localhost:8000/api/developers/${this.developerId}`)
          .then(response => {
            this.developer = response.data;
            this.isEditMode = true;
          })
          .catch(error => {
            console.error('Error fetching developer:', error);
          });
      }
    },
    saveDeveloper() {
      console.log(this.developer)
      const apiURL = this.isEditMode ? `http://localhost:8000/api/developers/${this.developerId}` : 'http://localhost:8000/api/developers';
      const method = this.isEditMode ? 'put' : 'post';
      console.log(apiURL, method)
      axios[method](apiURL, this.developer)
        .then(() => {
          this.$emit('save');
        })
        .catch(error => {
          console.error('Error saving developer:', error);
          this.errorMessage = 'Erro ao salvar o desenvolvedor. Por favor, tente novamente.';
        });
    },
    goBack() {
      this.$router.push({ name: 'Developers' });
    },
  },
  mounted() {
    this.fetchLevels();
    this.fetchDeveloper();
  }
};
</script>
