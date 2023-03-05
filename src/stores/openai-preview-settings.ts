import { acceptHMRUpdate, defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const usePreviewSettingsStore = defineStore('preview-settings', () => {
  const settings = ref({
    apiKey: 'sk-gCl2************',
    isSettingOpen: false,
    isSettingBackupOpen: true,
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
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      keyword: '',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Who won the world series in 2020?' },
        { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
        { role: 'user', content: 'Where was it played?' },
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
          temperature: 0.7,
          max_tokens: 2000,
          keyword: '',
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Who won the world series in 2020?' },
            { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
            { role: 'user', content: 'Where was it played?' },
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
