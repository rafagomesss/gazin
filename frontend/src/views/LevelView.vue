<template>
  <div>
    <CustomHeader />
    <div class="container mx-auto mt-4 p-4">
      <h2 class="text-2xl font-bold mb-4">Levels</h2>
      <button @click="newLevel" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
        Novo
      </button>

      <div class="relative mb-4">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Pesquisar níveis..."
          class="border rounded w-full py-2 px-3 pl-10 focus:outline-none focus:ring-1 focus:ring-teal-400"
        />
        <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zm-6.4-1.82a6 6 0 1112 0 6 6 0 01-12 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div v-if="loading">
        <SkeletonLoader v-for="n in 2" :key="n" />
      </div>

      <div v-else>
        <table v-if="filteredLevels.length" class="min-w-full bg-white">
          <thead>
            <tr class="text-center">
              <th class="py-2 px-4 border-b border-teal-400 font-bold">Nível</th>
              <th class="py-2 px-4 border-b border-teal-400 font-bold">Qt. Desenv.</th>
              <th class="py-2 px-4 border-b border-teal-400 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="level in filteredLevels" :key="level.id">
              <td class="py-2 px-4 border-b">{{ level.level }}</td>
              <td class="py-2 px-4 border-b">{{ level.developers_count }}</td>
              <td class="py-2 px-4 border-b">
                <button @click="editLevel(level)"
                  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Edit
                </button>
                <button @click="deleteLevel(level.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="text-center text-gray-500">Nenhum nível encontrado.</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CustomHeader from '../components/CustomHeader.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'

export default {
  components: {
    CustomHeader,
    SkeletonLoader
  },
  data() {
    return {
      levels: [],
      loading: true,
      searchTerm: ''
    }
  },
  computed: {
    filteredLevels() {
      return this.levels.filter(level => {
        return level.level.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    }
  },
  methods: {
    fetchLevels() {
      axios
        .get('http://localhost:8000/api/levels')
        .then((response) => {
          console.log(response)
          this.levels = response.data.data ?? []
        })
        .catch((error) => {
          console.error('Error fetching levels:', error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    newLevel() {
      this.$router.push({ name: 'NewLevel' })
    },
    editLevel(level) {
      this.$router.push({ name: 'EditLevel', params: { id: level.id } })
    },
    deleteLevel(levelId) {
      this.$swal({
        icon: 'warning',
        title: 'Deseja excluir?',
        text: 'Essa ação não poderá ser desfeita!',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8000/api/levels/${levelId}`)
            .catch((error) => {
              if (error.response.status === 403) {
                this.$swal({
                  icon: 'error',
                  title: 'Não permitido!',
                  text: 'Não foi possível excluir esse nível, pois ele está associado à outro(s) registro(s)!'
                })
              }
            })
            .finally(() => {
              this.fetchLevels()
            })
        }
      })
    }
  },
  mounted() {
    this.fetchLevels()
  }
}
</script>
