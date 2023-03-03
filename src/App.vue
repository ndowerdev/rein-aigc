<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'ReinAIGC - OpenAI Content Generator - ReinAIGC',
  meta: [
    { name: 'description', content: 'Generate AI Content with custom prompt using your own OpenAI API Key' },

  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>
