<template>
  <div>
    <div v-if="loading" class="max-w-3xl mx-auto mt-8">
      <FormSkeleton />
    </div>
    <div v-else class="max-w-3xl mx-auto mt-8">
      <h2 class="text-2xl font-bold mb-4">{{ isEditMode ? 'Editar Nível' : 'Cadastrar Novo Nível' }}</h2>
      <form @submit.prevent="saveLevel" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label for="level" class="block text-gray-700 text-sm font-bold mb-2">Nível</label>
          <input v-model="level.level" id="level" name="level" type="text" placeholder="Informe o nível"
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-500">
          {{ errorMessage }}
        </div>
        <div class="flex items-center justify-end">
          <button @click="goBack"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Voltar</button>
          <button type="submit"
            class="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FormSkeleton from '../skeleton/FormSkeleton.vue';

export default {
  props: {
    levelId: {
      type: Number,
      default: null,
    },
  },
  components: {
    FormSkeleton
  },
  data() {
    return {
      level: {
        level: '',
      },
      isEditMode: false,
      errorMessage: '',
      loading: true,
    };
  },
  methods: {
    fetchLevel() {
      if (this.levelId) {
        axios.get(`http://localhost:8000/api/levels/${this.levelId}`)
          .then(response => {
            this.level = response.data.data ?? [];
            this.isEditMode = true;
          })
          .catch(error => {
            console.error('Error fetching level:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },
    saveLevel() {
      const apiURL = this.isEditMode ? `http://localhost:8000/api/levels/${this.levelId}` : 'http://localhost:8000/api/levels';
      const method = this.isEditMode ? 'put' : 'post';
      axios[method](apiURL, this.level)
        .then(() => {
          this.$emit('save');
        })
        .catch(error => {
          const { data, status } = error.response
          if (data.error && status === 422) {
            this.errorMessage = error.response.data.error;
          } else {
            this.errorMessage = 'Erro ao salvar o nível. Por favor, tente novamente.';
          }
        });
    },
    goBack() {
      this.$router.push({ name: 'Levels' });
    },
  },
  mounted() {
    this.fetchLevel();
  },
};
</script>
