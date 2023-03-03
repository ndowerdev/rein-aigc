import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePreviewSettingsStore = defineStore('preview-settings', () => {
  const settings = ref({
    apiKey: 'sk-gCl2',
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
    language: '',
    lastResult: '',
  })

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('ndx-openapi-chat-settings'))
      settings.value = JSON.parse(localStorage.getItem('ndx-openapi-chat-settings') || '{}')

    else
      localStorage.setItem('ndx-openapi-chat-settings', JSON.stringify(settings.value))

    watch(settings,
      (settingsVal) => {
        localStorage.setItem('ndx-openapi-chat-settings', JSON.stringify(settingsVal))
      },
      { deep: true },
    )
  }
  return { settings }
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
