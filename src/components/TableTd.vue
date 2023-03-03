<script setup lang="ts">
const { modelValue } = defineModel<{
  modelValue: {
    type: String
    required: false

  }
}>()
</script>

<template>
  <td>
    {{ modelValue }}
  </td>
</template>
