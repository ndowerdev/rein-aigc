<script setup>
import { copyText } from 'vue3-clipboard'
import { saveAs } from 'file-saver'
const emits = defineEmits('closeBackupSetting')
const container = ref(null)

const router = useRouter()
const gotoDash = () => {
  router.push({ name: 'dash.index' })
}
const jsonSettings = ref(JSON.stringify(usePreviewSettingsStore().settings))

const { text, copy, copied, isSupported } = useClipboard({ jsonSettings })

const copyJson = () => {
  copy(jsonSettings.value)
  showtAlert('Settings copied to clipboard')
}
const downloadSettings = () => {
  const blob = new Blob([jsonSettings.value], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'reins-settings.json')
  showtAlert('Settings data downloaded')
}
</script>

<template>
  <div id="modal-open" class="m-auto  text-center fixed bg-gray top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-[20px] overscroll-auto">
    <div class="bg-white w-full lg:w-1/3 rounded-lg shadow-lg p-6 ackdrop-filter backdrop-blur-[20px]">
      <h2 class="text-lg font-bold mb-4 text-center text-black">
        SETTING BACKUP
      </h2>
      <textarea v-model="jsonSettings" class="textarea w-full" rows="10" />
      <div class="flex gap-2 justify-center">
        <button
          type="button" class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" @click="copyJson"
        >
          Copy To Clipboard
        </button>
        <button
          type="button" class="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" @click="downloadSettings"
        >
          Save File
        </button>
        <button
          type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="$emit('closeBackupSettings')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
