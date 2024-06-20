<template>
  <div>
    <CustomHeader />
    <div class="container mx-auto mt-4 p-4">
      <developer-form :developer-id="Number.parseInt($route.params.id)" @save="handleSave" />
    </div>
  </div>
</template>

<script>
import DeveloperForm from '../../components/form/DeveloperForm.vue';
import CustomHeader from '../../components/CustomHeader.vue';

export default {
  components: {
    DeveloperForm,
    CustomHeader,
  },
  methods: {
    handleSave() {
      this.$router.push({ name: 'Developers' });
    }
  }
};
</script>
