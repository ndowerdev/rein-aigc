<script setup>
import { NavMenus } from '../composables/menus'
const sidebarOpen = ref(true)
const notificationOpen = ref(false)
const dropdownOpen = ref(false)
</script>

<template>
  <main class="">
    <div class="w-full  xl:w-2/3  m-auto h-screen">
      <TheNavbar />
      <div />
      <RouterView />
    </div>
  </main>
</template>
