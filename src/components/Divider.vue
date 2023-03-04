<script setup>
const props = defineProps(['title'])
</script>

<template>
  <div class="relative flex py-5 items-center">
    <div class="flex-grow border-t border-gray-400" />
    <span class="flex-shrink mx-4 text-gray-400">{{ props.title }}</span>
    <div class="flex-grow border-t border-gray-400" />
  </div>
</template>

<style lang="scss" scoped>

</style>
