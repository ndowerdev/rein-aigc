<script setup>
import axios from 'axios'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'

// import { useLoading } from 'vue-loading-overlay'

// Import stylesheet
// import 'vue-loading-overlay/dist/vue-loading.css'

import { usePreviewSettingsStore } from '~/stores/openai-preview-settings'

const fullPage = ref(true)
const previewSettings = usePreviewSettingsStore()
// const hasil = ref('')
const hasil = computed(() => {
  return previewSettings.settings.davinci003.lastResult ? previewSettings.settings.davinci003.lastResult.choices[0].text.trim() : ''
})
const realPrompt = computed(() => {
  return previewSettings.settings.davinci003.prompt ? previewSettings.settings.davinci003.prompt.replaceAll('{keyword}', previewSettings.settings.davinci003.keyword).replaceAll('{language}', previewSettings.settings.davinci003.language) : ''
})

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

const resetModel003 = () => {
  previewSettings.$reset003()
}
const resx = ref('')
const isLoading = ref(false)
const loadEventSource = (id) => {
  const source = new EventSource(`https://tools.rendrian.dev/openai-stream.php?id=${id}`)

  source.onmessage = function (e) {
    if (/^[\],:{}\s]*$/.test(e.data.replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')))

      hasil.value += JSON.parse(e.data).choices[0].text

    else

      source.close()
  }
}
const saveAndExecute = function () {
  // const loader = $loading.show({
  //   isFullPage: true,
  //   loader: 'spinner',
  //   width: 100,
  //   height: 100,
  //   color: '#75BD4B',
  //   opacity: 0.8,
  //   lockScroll: true,

  //   backgroundColor: '#434343',

  // })
  isLoading.value = true

  // console.log(loader.show())

  const apiEndpoint = 'https://api.openai.com/v1/completions'
  // axios({
  //   method: 'post',
  //   url: 'https://tools.rendrian.dev/openai',
  //   headers: {
  //     'Content-Type': 'text/html',
  //     'Authorization': `Bearer ${previewSettings.settings.apiKey}`,
  //   },
  //   data: {
  //     // Bearer: `${previewSettings.settings.apiKey}`,
  //     model: 'text-davinci-003',
  //     prompt: realPrompt.value,
  //     temperature: previewSettings.settings.temperature,
  //     max_tokens: previewSettings.settings.max_tokens,
  //   },
  // }).then((response) => {
  //   loadEventSource(response.data.id)
  //   loader.hide()
  // })

  axios({
    method: 'post',
    url: 'https://api.openai.com/v1/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${previewSettings.settings.apiKey}`,
    },
    data: {
      model: previewSettings.settings.davinci003.model,
      prompt: realPrompt.value,
      temperature: parseFloat(previewSettings.settings.davinci003.temperature),
      max_tokens: parseFloat(previewSettings.settings.davinci003.max_tokens),
    },
  }).then((response) => {
    previewSettings.settings.davinci003.lastResult = response.data
    isLoading.value = false
  })
}
const visible = ref(false)
</script>

<template>
  <ModalError v-if="isLoading === true" />
  <div
    ref="formContainer"
    class="flex lg:flex-row-reverse flex-col-reverse  "
  >
    <div class="left w-full lg:w-2/3 text-white bg-leftcolor p-3 ">
      <div class="w-full divide-y">
        <div class="flex flex-wrap ">
          <div class="w-full px-3  md:mb-0">
            <label
              class="block uppercase tracking-wide text-white text-lg font-bold mb-10"
              for="real-prompt"
            >
              REAL PROMPT
            </label>
            <textarea
              id="real-prompt"
              v-model="realPrompt"
              rows="10"
              class="textarea textarea-primary w-full"
              placeholder="Masukkan Prompt"
              disabled
            />
          </div>
        </div>
        <div class="flex flex-wrap ">
          <div class="w-full px-3  md:mb-0">
            <label
              class="block uppercase tracking-wide text-white text-lg font-bold mb-2"
              for="preview-html"
            >
              PREVIEW HTML
            </label>
            <textarea
              id="preview-html"
              v-model="hasil"
              rows="30"
              class="w-full  text-sm    border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  "
              placeholder="Masukkan Prompt"
              disabled
            />
          </div>
        </div>
        <!-- <div class="flex flex-wrap ">
                  <div class="w-full px-3  md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-white text-lg font-bold mb-2"
                      for="previewcontent"
                    >
                      PREVIEW CONTENT
                    </label>
                    <article
                      class="prose prose-sm m-auto text-white text-justify"
                      v-html="hasil"
                    />
                  </div>
                </div> -->
      </div>
    </div>
    <div class="right w-full lg:w-1/3  p-3">
      <label
        class="block uppercase tracking-wide text-white text-lg font-bold mb-5 text-center"
        for="settings"
      >
        SETTINGS
      </label>
      <div class="w-full max-w-xl p-3 m-auto">
        <div class="collapse collapse-open    collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox">
          <div class="collapse-title text-xl font-medium">
            OPEN SETTINGS
          </div>
          <div class="collapse-content">
            <div class="flex flex-wrap -mx-3 ">
              <div class="w-full md:w-2/3 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="model"
                >
                  Model
                </label>
                <input
                  id="model"
                  v-model="previewSettings.settings.davinci003.model"
                  class="input input-bordered  w-full"
                  type="text"
                  placeholder="gpt-3.5-turbo"
                >
              </div>
              <div class="md:w-1/3 w-full px-3">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  ACTION
                </label>
                <button
                  class="btn w-full "
                  @click="saveAndExecute"
                >
                  Save & Execute
                </button>
              </div>
              <div class=" w-full px-3">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  ACTION
                </label>
                <button
                  class="btn w-full "
                  @click="resetModel003"
                >
                  Reset
                </button>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 ">
              <div class="w-full  px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="api-key"
                >
                  API KEY
                </label>
                <input
                  id="api-key"
                  v-model="previewSettings.settings.apiKey"
                  class="input input-bordered  w-full"
                  type="text"
                  placeholder="Jane"
                >
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 ">
              <div class="w-full  px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="keyword"
                >
                  Keyword
                </label>
                <input
                  id="keyword"
                  v-model="previewSettings.settings.davinci003.keyword"
                  class="input input-bordered  w-full"
                  type="text"
                  placeholder="Jane"
                >
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="grid-password"
                >
                  PROMPT
                </label>

                <textarea
                  id="comment"
                  v-model="previewSettings.settings.davinci003.prompt"
                  rows="10"
                  class="textarea textarea-bordered w-full"
                  placeholder="Masukkan Prompt"
                />

                <p class="text-white text-xs italic">
                  Kreasikan sesukamu. Tags tersedia {keyword},{language}
                </p>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="temperature"
                >
                  Temperature
                </label>
                <input
                  id="temperature"
                  v-model="previewSettings.settings.davinci003.temperature"
                  class="input input-bordered w-full"
                  type="text"
                >
              </div>
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="max-tokens"
                >
                  Max Tokens
                </label>
                <input
                  id="max-tokens"
                  v-model="previewSettings.settings.davinci003.max_tokens"
                  class="input input-bordered w-full"
                  type="text"
                >
              </div>
              <div class="w-full md:w-1/2 px-3  md:mb-0">
                <label
                  class="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="language"
                >
                  Language
                </label>
                <div class=" w-full">
                  <select
                    id="language"
                    v-model="previewSettings.settings.davinci003.language"
                    class="select select-bordered"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: reinsaigc-index
meta:
  layout: dashboard
</route>
