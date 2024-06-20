<template>
  <div>
    <CustomHeader />
    <div class="container mx-auto mt-4 p-4">
      <h2 class="text-2xl font-bold mb-4">Developers</h2>
      <button @click="newDeveloper"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Novo</button>

      <div class="relative mb-4">
        <input v-model="searchTerm" type="text" placeholder="Pesquisar desenvolvedores..."
          class="border rounded w-full py-2 px-3 pl-10 focus:outline-none focus:ring-1 focus:ring-teal-400" />
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="currentColor"
          viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zm-6.4-1.82a6 6 0 1112 0 6 6 0 01-12 0z"
            clip-rule="evenodd" />
        </svg>
      </div>

      <div v-if="loading">
        <SkeletonLoader v-for="n in 2" :key="n" />
      </div>

      <div v-else>
        <table v-if="filteredDevelopers.length" class="min-w-full bg-white">
          <thead>
            <tr class="text-center">
              <th class="py-2 px-4 border-teal-400 font-bold border-b">Name</th>
              <th class="py-2 px-4 border-teal-400 font-bold border-b">Gender</th>
              <th class="py-2 px-4 border-teal-400 font-bold border-b">Birthdate</th>
              <th class="py-2 px-4 border-teal-400 font-bold border-b">Hobby</th>
              <th class="py-2 px-4 border-teal-400 font-bold border-b">Level</th>
              <th class="py-2 px-4 border-teal-400 font-bold border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="developer in filteredDevelopers" :key="developer.id">
              <td class="py-2 px-4 border-b">{{ developer.name }}</td>
              <td class="py-2 px-4 border-b">{{ developer.gender }}</td>
              <td class="py-2 px-4 border-b">{{ developer.birthdate }}</td>
              <td class="py-2 px-4 border-b">{{ developer.hobby }}</td>
              <td class="py-2 px-4 border-b">{{ developer.level.level }}</td>
              <td class="py-2 px-4 border-b">
                <button @click="editDeveloper(developer)"
                  class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded mr-2">Editar</button>
                <button @click="deleteDeveloper(developer.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="text-center text-gray-500">
          Nenhum desenvolvedor encontrado.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CustomHeader from '../components/CustomHeader.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';

export default {
  components: {
    CustomHeader,
    SkeletonLoader,
  },
  data() {
    return {
      developers: [],
      loading: true,
      searchTerm: '',
    };
  },
  computed: {
    filteredDevelopers() {
      return this.developers.filter(developer => {
        return developer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    }
  },
  methods: {
    fetchDevelopers() {
      axios.get('http://localhost:8000/api/developers')
        .then(response => {
          this.developers = response.data.data ?? [];
        })
        .catch(error => {
          console.error('Error fetching developers:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    newDeveloper() {
      this.$router.push({ name: 'NewDeveloper' });
    },
    editDeveloper(developer) {
      this.$router.push({ name: 'EditDeveloper', params: { id: developer.id } });
    },
    deleteDeveloper(developerId) {
      this.$swal({
        icon: 'warning',
        title: 'Deseja excluir?',
        text: 'Essa ação não poderá ser desfeita!',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar'
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8000/api/developers/${developerId}`)
              .then(() => {
                this.$swal({
                  title: 'Excluído!',
                  text: 'O registro selecionado foi excluído.',
                  icon: 'success'
                });
                this.fetchDevelopers();
              })
              .catch(error => {
                this.$toast.info('Error: ' + error.message)
                console.log(error)
              });
          }
        })
        .finally(() => {
          this.fetchDevelopers();
        });
    },
  },
  mounted() {
    this.fetchDevelopers();
  },
};
</script>
