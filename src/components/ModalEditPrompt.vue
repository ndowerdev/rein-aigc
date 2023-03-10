<script setup>
import { copyText } from 'vue3-clipboard'
import { saveAs } from 'file-saver'
const props = defineProps({
  modelValue: Object,
})
const emits = defineEmits('closeEditPrompt')
const router = useRouter()
const gotoDash = () => {
  router.push({ name: 'dash.index' })
}
</script>

<template>
  <div
    id="modal-open"
    class="m-auto  text-center fixed bg-gray top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-[20px] overscroll-auto"
  >
    <div class="bg-white w-full lg:w-1/3 rounded-lg shadow-lg p-6 ackdrop-filter backdrop-blur-[20px]">
      <h2 class="text-lg font-bold mb-4 text-center text-black">
        EDIT MODAL
      </h2>
      <input
        id="api-key"
        v-model="modelValue.name"
        class="input input-bordered  w-full mb-3"
        type="text"
        placeholder="10 Alasan Cewek Mudah Marah"
      >
      <textarea
        v-model="modelValue.value"
        class="textarea w-full"
        rows="5"
      />
      <div class="flex gap-2 justify-center">
        <button
          type="button"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="$emit('closeEditPrompt')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
