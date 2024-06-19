<template>
  <div>
    <CustomHeader />
    <div class="container mx-auto mt-4 p-4">
      <h2 class="text-2xl font-bold mb-4">Developers</h2>
      <button @click="newDeveloper"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Novo</button>

      <div v-if="loading">
        <SkeletonLoader v-for="n in 2" :key="n" />
      </div>

      <div v-else>
        <table v-if="developers.length" class="min-w-full bg-white">
          <thead>
            <tr class="text-center">
              <th class="py-2 px-4 border-b">Name</th>
              <th class="py-2 px-4 border-b">Gender</th>
              <th class="py-2 px-4 border-b">Birthdate</th>
              <th class="py-2 px-4 border-b">Hobby</th>
              <th class="py-2 px-4 border-b">Level</th>
              <th class="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="developer in developers" :key="developer.id">
              <td class="py-2 px-4 border-b">{{ developer.name }}</td>
              <td class="py-2 px-4 border-b">{{ developer.gender }}</td>
              <td class="py-2 px-4 border-b">{{ developer.birthdate }}</td>
              <td class="py-2 px-4 border-b">{{ developer.hobby }}</td>
              <td class="py-2 px-4 border-b">{{ developer.level.level }}</td>
              <td class="py-2 px-4 border-b">
                <button @click="editDeveloper(developer)"
                  class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button @click="deleteDeveloper(developer.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
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
    };
  },
  methods: {
    fetchDevelopers() {
      axios.get('http://localhost:8000/api/developers')
        .then(response => {
          this.developers = response.data;
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
      axios.delete(`http://localhost:8000/api/developers/${developerId}`)
        .then(() => {
          this.fetchDevelopers();
        })
        .catch(error => {
          console.error('Error deleting developer:', error);
        });
    },
  },
  mounted() {
    this.fetchDevelopers();
  },
};
</script>
