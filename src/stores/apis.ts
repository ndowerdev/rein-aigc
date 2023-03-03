import { acceptHMRUpdate, defineStore } from 'pinia'

export const useApiKeyStore = defineStore('member-api-key', () => {
  const apiKeyData = ref([
    {
      api_key: 'sample',
      remarks: 'sample',
    },
  ])

  const getApiList = () => {
    return apiKeyData
  }

  const addNewApi = (api_key: string, remarks: string) => {
    // apiKeyData.value.push
    const index = apiKeyData.value.findIndex(x => x.api_key === api_key)
    return index === -1 ? apiKeyData.value.push({ api_key, remarks }) : false
  }

  const removeApiByIndex = (index: string) => {
    apiKeyData.value = apiKeyData.value.filter(i => i.api_key !== index)
  }

  // get localstorage item if exist
  if (localStorage.getItem('ndx-openapi-api-key'))
    apiKeyData.value = JSON.parse(localStorage.getItem('ndx-openapi-api-key') || '{}')
  // if not exist create default value
  else
    localStorage.setItem('ndx-openapi-api-key', JSON.stringify(apiKeyData.value))

  // watch data and auto update
  watch(apiKeyData,
    (settingsVal) => {
      localStorage.setItem('ndx-openapi-api-key', JSON.stringify(settingsVal))
    },
    { deep: true },
  )

  return { addNewApi, getApiList, removeApiByIndex }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useApiKeyStore, import.meta.hot))
