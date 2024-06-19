<template>
  <div>
    <CustomHeader />
    <div class="container mx-auto mt-4 p-4">
      <h2 class="text-2xl font-bold mb-4">Levels</h2>
      <button @click="newLevel" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Novo</button>

      <div v-if="loading">
        <SkeletonLoader v-for="n in 2" :key="n" />
      </div>

      <div v-else>
        <table v-if="levels.length" class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Level</th>
              <th class="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="level in levels" :key="level.id">
              <td class="py-2 px-4 border-b">{{ level.level }}</td>
              <td class="py-2 px-4 border-b">
                <button @click="editLevel(level)"
                  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button @click="deleteLevel(level.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="text-center text-gray-500">
          Nenhum nível encontrado.
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
      levels: [],
      loading: true,
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
    newLevel() {
      this.$router.push({ name: 'NewLevel' });
    },
    editLevel(level) {
      this.$router.push({ name: 'EditLevel', params: { id: level.id } });
    },
    deleteLevel(levelId) {
      axios.delete(`http://localhost:8000/api/levels/${levelId}`)
        .then(() => {
          this.fetchLevels();
        })
        .catch(error => {
          console.error('Error deleting level:', error);
        });
    },
  },
  mounted() {
    this.fetchLevels();
  },
};
</script>
