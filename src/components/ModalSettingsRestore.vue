<script setup>
import { copyText } from 'vue3-clipboard'
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2'
const emits = defineEmits('closeBackupSetting')
const container = ref(null)

const router = useRouter()
const gotoDash = () => {
  router.push({ name: 'dash.index' })
}
const jsonSettings = ref('')
const isValidJson = ref(false)

watch(
  () => jsonSettings.value, (newVal, oldVal) => {
    if (/^[\],:{}\s]*$/.test(newVal.replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')))

      isValidJson.value = true
    // usePreviewSettingsStore().settings = JSON.stringify(jsonSettings.value)

    else
      isValidJson.value = false
  },

  { deep: true },
)
const restoreSettings = () => {
  if (/^[\],:{}\s]*$/.test(jsonSettings.value.replace(/\\["\\\/bfnrtu]/g, '@')
    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    const newSettings = JSON.parse(jsonSettings.value)
    usePreviewSettingsStore().$restoreSettings(newSettings)
  }

  else { showtAlert('JSON String not valid') }
  // the json is not ok
}
</script>

<template>
  <div
    id="modal-open"
    class="m-auto  text-center fixed bg-gray top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-[20px] overscroll-auto"
  >
    <div class="bg-white w-full lg:w-1/3 rounded-lg shadow-lg p-6 ackdrop-filter backdrop-blur-[20px]">
      <h2 class="text-lg font-bold mb-4 text-center text-black">
        SETTING RESTORE
      </h2>
      <textarea
        v-model="jsonSettings"
        class="textarea w-full"
        rows="10"
      />
      <div class="flex gap-2 justify-center">
        <button
          type="button"
          class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          @click="restoreSettings"
        >
          Restore Settings
        </button>

        <button
          type="button"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="$emit('closeRestoreSettings')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
