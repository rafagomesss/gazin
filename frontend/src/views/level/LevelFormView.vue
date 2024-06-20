<template>
  <div>
    <CustomHeader />
    <div class="container mx-auto mt-4 p-4">
      <level-form :level-id="Number.parseInt($route.params.id)" @save="handleSave" />
    </div>
  </div>
</template>

<script>
import LevelForm from '../../components/form/LevelForm.vue';
import CustomHeader from '../../components/CustomHeader.vue';

export default {
  components: {
    LevelForm,
    CustomHeader,
  },
  methods: {
    handleSave() {
      this.$router.push({ name: 'Levels' });
    }
  }
};
</script>
