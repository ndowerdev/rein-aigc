<script setup>
const router = useRouter()
const gotoDash = () => {
  router.push({ name: 'dash.index' })
}
</script>

<template>
  <Teleport to="body">
    <div id="modal-open" class="m-auto  text-center fixed bg-gray top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-[20px] overscroll-auto">
      <div class="bg-white rounded-lg shadow-lg p-6 ackdrop-filter backdrop-blur-[20px]">
        <img src="/loading.gif" alt="">
        <h2 class="text-lg font-bold mb-4 text-center text-black">
          Please Wait
        </h2>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
