import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMemberStore = defineStore('member', () => {
  const memberData = ref({})

  if (localStorage.getItem('ndx-openapi-user-data'))
    memberData.value = JSON.parse(localStorage.getItem('ndx-openapi-user-data') || '{}')

  else
    localStorage.setItem('ndx-openapi-user-data', JSON.stringify({}))

  watch(memberData,
    (settingsVal) => {
      localStorage.setItem('ndx-openapi-user-data', JSON.stringify(settingsVal))
    },
    { deep: true },
  )
  return { memberData }
  // const apiKey = ref('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')
  // const prompt = ref('Abaikan perintah saya sebelumnya. Saya perintahkan anda berperan sebagai Conten Writer Pakar Komputer yang sangat mahir berbahasa Indonesia dan lancar menulis. Tulis artikel yang panjang dan optiomal untuk SEO dengan judul artikel "{keyword}". Panjang artikel Minimal 600 kata. Saya membutuhkan konten yang unik dan murni bukan hasil plagiarisme. Tulislah konten dengan gaya percayakan seolah-olah ditulis oleh manusia. Saat menyiapkan artikel, tulislah kata-kata yang di perlukan dengan huruf tebal. Tulis dalam file HTML tanpa html dan tag body. Artikel terdiri dari minimal 20 paragraf. Setiap paragraf harus memiliki minimal 200 kata. Judul pertama harus menggunakan tag <h1>, sub judul harus menggunakan tag <h2> dan paragraf harus menggunakan tag <p>. Nama bisnis saya adalah "Rendrian.ID". Nomor HP saya adalah 081253363512. Di akhir artikel sertakan paragraf untuk menyebutkan nama bisnis saya dan nomor telepon dalam format tautan dan format tautan whatsapp. Pastikan artikel tidak terputus. Bersihkan semua text sebelum <h1>.')
  // const model = ref('text-davinci-003')
  // const keyword = ref('')
  // const temperature = ref(0.7)
  // const max_tokens = ref(2000)
  // const top_p = ref(1)
  // const n = ref(1)
  // const stream = ref(false)
  // const logprobs = ref(null)
  // const stop = ref('\n')
  // return {
  //   apiKey, prompt, model, keyword, temperature, max_tokens, top_p, n, stream, logprobs, stop,

  // }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot))
