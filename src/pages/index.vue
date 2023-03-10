<script setup>
import axios from 'axios'

import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'

// import { useLoading } from 'vue-loading-overlay'

// Import stylesheet
// import 'vue-loading-overlay/dist/vue-loading.css'

// import { usePreviewSettingsStore } from '~/stores/openai-preview-settings'

const fullPage = ref(true)
const previewSettings = usePreviewSettingsStore()
// const hasil = ref('')
const hasil = computed(() => {
  return previewSettings.settings.gptTurbo.lastResult ? previewSettings.settings.gptTurbo.lastResult.choices[0].message.content.trim() : ''
})
const realPrompt = computed(() => {
  return previewSettings.settings.prompt ? previewSettings.settings.prompt.replaceAll('{keyword}', previewSettings.settings.keyword).replaceAll('{language}', previewSettings.settings.language) : ''
})
const keyword = ref('')
const newMessage = ref({
  role: '',
  content: '',
})
useHead({
  title: 'OpenAI GPT 3.5 Turbo Prompt Tester - ReinAGC',
  meta: [
    { name: 'description', content: 'Generate AI Content using OpenAI GPT 3.5 Turbo with custom prompt using your own OpenAI API Key' },

  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})
const roles = ref([
  {
    name: 'System',
    val: 'system',
  },
  {
    name: 'User',
    val: 'user',
  },
  {
    name: 'Assistant',
    val: 'assistant',
  },
])

const addThisMessage = () => {
  if (newMessage.value.content !== '' && newMessage.value.role !== '') {
    previewSettings.settings.gptTurbo.messages.push(newMessage.value)
    newMessage.value = {
      role: 'user',
      content: '',
    }
  }
}

const resx = ref('')
const isLoading = ref(false)
const removeThisMessage = (index) => {
  // formData.value.org.splice(formData.value.org.indexOf(index), 1)
  previewSettings.settings.gptTurbo.messages.splice(previewSettings.settings.gptTurbo.messages.indexOf(index), 1)
}
const visible = ref(false)

const formMessage = ref(previewSettings.settings.gptTurbo.messages.map((item) => {
  return {
    role: item.role,
    content: item.content.replaceAll('{keyword}', previewSettings.settings.gptTurbo.keyword).replaceAll('{language}', previewSettings.settings.gptTurbo.language),
  }
}))

const saveAndExecute = function () {
  isLoading.value = true

  const apiEndpoint = 'https://api.openai.com/v1/completions'

  axios({
    method: 'post',
    timeout: 600000,
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${previewSettings.settings.apiKey}`,
    },
    data: {
      model: previewSettings.settings.gptTurbo.model,
      messages: previewSettings.settings.gptTurbo.messages,
      temperature: previewSettings.settings.gptTurbo.temperature,
      top_p: previewSettings.settings.gptTurbo.top_p,
      // stream: true,
      // temperature: parseFloat(previewSettings.settings.temperature),
      // max_tokens: parseFloat(previewSettings.settings.max_tokens),
    },
  }).then((response) => {
    isLoading.value = false
    previewSettings.settings.gptTurbo.lastResult = response.data
  }).catch((e) => {
    isLoading.value = false
    showtAlert('401 Error, Check API Key!')
  })
}

watch(
  () => previewSettings.settings.gptTurbo.prompt, (newVal, oldVal) => {
    // ip address input validation

    previewSettings.settings.gptTurbo.messages[0].content = newVal.value.replaceAll('{keyword}', previewSettings.settings.gptTurbo.keyword).replaceAll('{language}', previewSettings.settings.gptTurbo.language).replaceAll('[TARGETLANGUAGE]', previewSettings.settings.gptTurbo.language).replaceAll('[PROMPT]', previewSettings.settings.gptTurbo.keyword)
  },

  { deep: true },
)

watch(
  () => previewSettings.settings.gptTurbo.messages, (newVal, oldVal) => {
    // ip address input validation
    previewSettings.settings.gptTurbo.messages[0].content.replaceAll('{keyword}', previewSettings.settings.gptTurbo.keyword).replaceAll('{language}', previewSettings.settings.gptTurbo.language).replaceAll('[TARGETLANGUAGE]', previewSettings.settings.gptTurbo.language).replaceAll('[PROMPT]', previewSettings.settings.gptTurbo.keyword)
  },

  { deep: true },
)
watch(
  () => previewSettings.settings.gptTurbo.keyword, (newVal, oldVal) => {
    previewSettings.settings.gptTurbo.messages[0].content = previewSettings.settings.gptTurbo.prompt.value.replaceAll('{keyword}', previewSettings.settings.gptTurbo.keyword).replaceAll('{language}', previewSettings.settings.gptTurbo.language).replaceAll('[TARGETLANGUAGE]', previewSettings.settings.gptTurbo.language).replaceAll('[PROMPT]', previewSettings.settings.gptTurbo.keyword)
  },

  { deep: true },
)
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
      <div class="w-full max-w-xl m-auto ">
        <!-- collapse1 -->
        <div
          class="collapse  collapse-arrow border border-neutral bg-neutral "
          :class="{ 'collapse-open': previewSettings.settings.isSettingOpen === true, 'collapse-close': previewSettings.settings.isSettingOpen === false }"
        >
          <input
            type="checkbox"
            @click="previewSettings.settings.isSettingOpen = !previewSettings.settings.isSettingOpen"
          >
          <div class="collapse-title text-xl font-medium">
            SETTINGS
          </div>

          <div class="collapse-content">
            <Divider title="API Settings" />
            <div class="flex flex-wrap -mx-3 m-3">
              <div class="w-full  px-3  md:mb-0">
                <input
                  id="api-key"
                  v-model="previewSettings.settings.apiKey"
                  class="input input-bordered  w-full"
                  type="text"
                  placeholder="Jane"
                >

                <a
                  href="https://www.facebook.com/rendrian.g.arma/"
                  class="btn btn-outline mt-3  w-full"
                  target="_blank"
                >$120 API Limit IDR 20K ONLY!</a>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 m-3">
              <div class="w-full  px-3  md:mb-0">
                <Divider title="{keyword}" />
                <input
                  id="api-key"
                  v-model="previewSettings.settings.gptTurbo.keyword"
                  class="input input-bordered  w-full"
                  type="text"
                  placeholder="10 Alasan Cewek Mudah Marah"
                >
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 m-3">
              <div class="w-full  px-3  md:mb-0">
                <Divider title="{language}" />
                <select
                  id="language"
                  v-model="previewSettings.settings.davinci003.language"
                  class="select select-bordered  w-full"
                >
                  <option
                    v-for="(item, index) in languageList"
                    :key="index"
                    :value="item.name"
                    :selected="item.name === previewSettings.settings.davinci003.language"
                  >
                    {{ item.native_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 m-3">
              <div class="w-full  px-3  md:mb-0">
                <Divider title="{prompt}" />
                <select
                  id="language"
                  v-model="previewSettings.settings.gptTurbo.prompt"
                  class="select select-bordered  w-full"
                >
                  <option
                    v-for="(item, index) in previewSettings.settings.prompts"
                    :key="index"
                    :value="item"
                    :selected="previewSettings.settings.gptTurbo.prompt.value === item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <Divider title="Actions" />
            <div class="flex flex-wrap -mx-3">
              <div class=" w-1/2 px-3">
                <button
                  class="btn w-full btn-success "
                  @click="saveAndExecute"
                >
                  ▶️ Execute
                </button>
              </div>
              <div class=" w-1/2 px-3">
                <button
                  class="btn w-full btn-warning "
                  @click="previewSettings.$resetTurbo()"
                >
                  🔄️ Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- collapse2 -->

        <div
          :class="{ 'collapse-open': previewSettings.settings.isSettingBackupOpen === true }"
          class="collapse  collapse-arrow border border-neutral bg-neutral mt-3"
        >
          <input
            type="checkbox"
            class="peer"
            @click="previewSettings.settings.isSettingBackupOpen = !previewSettings.settings.isSettingBackupOpen"
          >
          <div class="collapse-title text-xl font-medium">
            SETTINGS BACKUP
          </div>

          <div class="collapse-content">
            <Divider title="API Settings" />
            <div class="flex flex-wrap -mx-3 m-3" />
            <TurboSettings />
          </div>
        </div>
      </div>
    </div>
    <div class="left w-full lg:w-2/3 bg-neutral border-neutral p-2 ">
      <div class="w-full ">
        <div class="flex flex-wrap ">
          <div class="w-full px-3  md:mb-0">
            <Divider title=" RESULT" />
            <!-- <div>{{ previewSettings.settings.gptTurbo.messages[0].content }}</div> -->
            <textarea
              v-model="hasil"
              class="textarea textarea-bordered textarea-md w-full "
              placeholder="Loading..."
              rows="20"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: openai-turbo
meta:
  layout: dashboard
</route>
