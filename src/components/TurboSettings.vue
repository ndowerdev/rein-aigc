<script setup>
// defineEmits(['resetAllSettings', 'backupSettings', 'restoreSettings'])

const toggle = ref({
  showBackupSettings: false,
  showRestoreSettings: false,
})

const closeBackupSetting = () => {
  toggle.value.showBackupSettings = !toggle.value.showBackupSettings
}
const closeRestoreSettings = () => {
  toggle.value.showRestoreSettings = !toggle.value.showRestoreSettings
}
const backupSettings = () => {

}
const restoreSettings = () => {}
const resetAllSettings = () => {

}
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- <button class="btn w-full btn-sm" @click="$emit('backupSettings')">
      BACKUP SETTINGS
    </button>
    <button class="btn w-full btn-sm" @click="$emit('restoreSettings')">
      RESTORE SETTINGS
    </button>
    <button class="btn w-full btn-sm" @click="$emit('resetAllSettings')">
      RESET ALL SETTING
    </button> -->
    <button
      class="btn w-full btn-sm"
      :class="{ 'btn-active btn-outline': toggle.showBackupSettings === true }" @click="toggle.showBackupSettings = !toggle.showBackupSettings"
    >
      BACKUP SETTINGS
    </button>
    <button class="btn w-full btn-sm" :class="{ 'btn-active btn-outline': toggle.showRestoreSettings === true }" @click="toggle.showRestoreSettings = !toggle.showRestoreSettings">
      RESTORE SETTINGS
    </button>
    <button class="btn w-full btn-sm" @click="resetAllSettings">
      RESET ALL SETTING
    </button>

    <ModalSettingsBackup v-if="toggle.showBackupSettings === true" @close-backup-settings="closeBackupSetting" />
    <ModalSettingsRestore v-if="toggle.showRestoreSettings === true" @close-restore-settings="closeRestoreSettings" />
  </div>
</template>

<style lang="scss" scoped>

</style>
