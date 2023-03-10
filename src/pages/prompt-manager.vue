<script setup>
import { v4 as uuidv4 } from 'uuid'

const initialPrompt = {
  id: '',
  name: '',
  value: '',

}
const toggle = ref({
  showEditPrompt: false,
})
const promptModel = ref(initialPrompt)
const localPrompts = usePreviewSettingsStore().settings.prompts
const promptToEdit = ref(1)

const addOrEdit = () => {
  if (promptModel.value.name === '' || promptModel.value.value === '')
    return

  if (promptModel.value.id === '')
    promptModel.value.id = uuidv4()

  // check if not exist
  if (!localPrompts.some(e => e.id === promptModel.value.id)) {
    localPrompts.push(promptModel.value)
    location.reload()
  }
  else {
    const index = localPrompts.findIndex(e => e.id === promptModel.value.id)
    localPrompts[index] = promptModel.value
    promptModel.value = initialPrompt
  }
}
const isLoading = ref(false)
//  previewSettings.settings.gptTurbo.messages.splice(previewSettings.settings.gptTurbo.messages.indexOf(index), 1)
const deletePrompt = (index) => {
  localPrompts.splice(index, 1)
}

const editPrompt = (index) => {
  toggle.value.showEditPrompt = true

  promptToEdit.value = localPrompts[index]
}

const closeEditPrompt = () => {
  toggle.value.showEditPrompt = false
}
const promptToEditValue = computed(() => {
  return promptToEdit.value
})
</script>

<template>
  <ModalError v-if="isLoading === true" />
  <h2 class="text-xl text-center m-5 font-bold text-green-300">
    REIN AIGC - OpenAI Content Generator Online
  </h2>

  <div
    ref="formContainer"
    class="flex lg:flex-row flex-col  gap-3"
  >
    <div class="right w-full lg:w-1/3  ">
      <div class="collapse collapse-open collapse-arrow border border-neutral bg-neutral ">
        <input
          type="checkbox"
          class="peer"
        >
        <div class="collapse-title text-xl font-medium">
          INPUT PROMPT
        </div>

        <div class="collapse-content">
          <Divider title="API Settings" />
          <div class="flex flex-wrap -mx-3 m-3" />
          <input
            id="api-key"
            v-model="promptModel.name"
            class="input input-bordered  w-full mb-3"
            type="text"
            placeholder="10 Alasan Cewek Mudah Marah"
          >
          <textarea
            v-model="promptModel.value"
            type="text"
            placeholder="Prompt"
            class="textarea textarea-bordered w-full"
            rows="3"
          />
          <button
            class="btn w-full btn-success "
            @click="addOrEdit"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
    <div class="left w-full lg:w-2/3 bg-neutral border-neutral p-2 ">
      <div class="w-full ">
        <div class="flex flex-wrap ">
          <div class="w-full px-3  md:mb-0">
            <Divider title=" RESULT" />
            <div class="overflow-x-auto">
              <table class="table w-full">
                <!-- head -->
                <thead />
                <tbody>
                  <!-- row 1 -->

                  <tr
                    v-for="(item, index) in localPrompts"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>

                    <td class="flex gap-2">
                      <button
                        class="btn btn-info btn-xs"
                        @click="editPrompt(index)"
                      >
                        edit
                      </button>
                      <button
                        class="btn btn-xs btn-warning"
                        @click="deletePrompt(index)"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalEditPrompt
    v-if="toggle.showEditPrompt === true"
    v-model="promptToEditValue"
    @close-edit-prompt="closeEditPrompt"
  />
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: reinsaigc-prompt-manager
meta:
  layout: dashboard
</route>
