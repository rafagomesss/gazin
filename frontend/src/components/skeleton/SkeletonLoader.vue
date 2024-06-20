<template>
  <div class="bg-gray-200 p-4 rounded-md animate-pulse">
    <div class="flex space-x-4">
      <div class="rounded-full bg-gray-300 h-12 w-12"></div>
      <div class="flex-1 space-y-4 py-1">
        <div class="h-4 bg-gray-300 rounded"></div>
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
};
</script>

<style scoped>
/* Estilos específicos do Tailwind CSS para o esqueleto */
</style>
