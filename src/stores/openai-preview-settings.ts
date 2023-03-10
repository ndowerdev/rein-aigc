import { acceptHMRUpdate, defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const usePreviewSettingsStore = defineStore('preview-settings', () => {
  const settings = ref({
    apiKey: 'sk-gCl2************',
    isSettingOpen: false,
    isSettingBackupOpen: true,
    prompts: [],
    davinci003: {
      prompt: 'Abaikan perintah saya sebelumnya. Saya perintahkan anda berperan sebagai Conten Writer Pakar Komputer yang sangat mahir berbahasa Indonesia dan lancar menulis. Tulis artikel yang panjang dan optiomal untuk SEO dengan judul artikel "{keyword}". Panjang artikel Minimal 600 kata. Saya membutuhkan konten yang unik dan murni bukan hasil plagiarisme. Tulislah konten dengan gaya percayakan seolah-olah ditulis oleh manusia. Saat menyiapkan artikel, tulislah kata-kata yang di perlukan dengan huruf tebal. Tulis dalam file HTML tanpa html dan tag body. Artikel terdiri dari minimal 20 paragraf. Setiap paragraf harus memiliki minimal 200 kata. Judul pertama harus menggunakan tag <h1>, sub judul harus menggunakan tag <h2> dan paragraf harus menggunakan tag <p>. ',
      model: 'text-davinci-003',
      keyword: '',
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: '\n',
      language: 'Indonesian',
      lastResult: '',
    },
    gptTurbo: {
      language: 'Indonesian',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      keyword: '',
      prompt: {
        id: '',
        name: '',
        value: '',
      },
      messages: [

        {
          role: 'user', content: 'asda',
        },

      ],
      lastResult: '',

    },

  })

  // if (typeof window !== 'undefined') {
  //   if (localStorage.getItem('ndx-openapi-chat-settings')) {
  //     console.log(true)
  //     localStorage.setItem('ndx-openapi-chat-settings', JSON.stringify(settings.value))
  //   }
  //   else {
  //     console.log(false)
  //     settings.value = JSON.parse(localStorage.getItem('ndx-openapi-chat-settings') || '{}')
  //   }
  // }
  // watch(settings,
  //   (settingsVal) => {
  //     console.log('changed')

  //     // useLocalStorage('ndx-openapi-chat-settings', settingsVal)
  //     localStorage.setItem('ndx-openapi-chat-settings', JSON.stringify(settingsVal))
  //   },
  //   { deep: true },
  // )

  // watch(() => settings.value, (state) => {
  //   console.log('changed')
  //   useLocalStorage('ndx-openapi-chat-settings', settings.value)
  //   // localStorage.setItem('ndx-openapi-chat-settings', JSON.stringify(state))
  // })

  function $reset003() {
    Swal.fire({
      title: 'Reset Davinci003 Settings?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        settings.value.davinci003 = {
          prompt: 'Abaikan perintah saya sebelumnya. Saya perintahkan anda berperan sebagai Conten Writer Pakar Komputer yang sangat mahir berbahasa Indonesia dan lancar menulis. Tulis artikel yang panjang dan optiomal untuk SEO dengan judul artikel "{keyword}". Panjang artikel Minimal 600 kata. Saya membutuhkan konten yang unik dan murni bukan hasil plagiarisme. Tulislah konten dengan gaya percayakan seolah-olah ditulis oleh manusia. Saat menyiapkan artikel, tulislah kata-kata yang di perlukan dengan huruf tebal. Tulis dalam file HTML tanpa html dan tag body. Artikel terdiri dari minimal 20 paragraf. Setiap paragraf harus memiliki minimal 200 kata. Judul pertama harus menggunakan tag <h1>, sub judul harus menggunakan tag <h2> dan paragraf harus menggunakan tag <p>. ',
          model: 'text-davinci-003',
          keyword: '',
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
          stop: '\n',
          language: 'Indonesian',
          lastResult: '',
        }
        Swal.fire(
          'Done!',
          'Davinci003 settings has been reset!.',
          'success',
        )
      }
    })
  }
  function $resetTurbo() {
    Swal.fire({
      title: 'Reset Turbo Settings?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        settings.value.gptTurbo = {
          model: 'gpt-3.5-turbo',
          language: 'Indonesian',
          temperature: 0.7,
          max_tokens: 2000,
          keyword: '',
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
          messages: [
            {
              role: 'user', content: `The article should include Creative Title (should be in H1 Heading), SEO meta description, Introduction, headings (Should be h2 heading) and format it as HTML Blog Post, sub headings (h3, h4,h5,h6 headings), bullet points or Numbered list if needed, frequently asked questions and conclusion.
            After the title insert image using this format "https://tse1.mm.bing.net/th?q={app_name}".`,
            },
          ],
          lastResult: '',
        }
        Swal.fire(
          'Done!',
          'Turbo settings has been reset!.',
          'success',
        )
      }
    })
  }

  function $restoreSettings(value: any) {
    settings.value = value
    Swal.fire(
      'Done!',
      'Turbo settings has been restored!.',
      'success',
    )
  }
  return { settings, $reset003, $resetTurbo, $restoreSettings }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePreviewSettingsStore, import.meta.hot))
  //  previousNames = ref(new Set<string>())

//  usedNames = computed(() => Array.from(previousNames.value))
//  otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

// /**
//  * Changes the current name of the user and saves the one that was used
//  * before.
//  *
//  * @param name - new name to set
//  */
// function setNewName(name= string) {
//   if (savedName.value)
//     previousNames.value.add(savedName.value)

//   savedName.value = name
// }
