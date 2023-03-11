<script setup>
import { useAxios } from '@vueuse/integrations/useAxios'
import { NavButton, Paginate } from '@brutforce/vue3-paginate'
import { Pagination } from 'paginatedjs'
const emit = defineEmits()
const { data, isFinished, isLoading } = useAxios('https://tools.rendrian.dev/aiprm')

const page = ref(1)
const perPage = ref(10)

const searchThis = ref('')

const filteredData = ref()

const filteredDataBySearch = ref()
const Paginator = (items, current_page, per_page) => {
  const currentPage = current_page || 1
  const perPage = per_page || 10
  const offset = (currentPage - 1) * per_page

  const paginatedItems = items.slice(offset).slice(0, per_page)
  const total_pages = Math.ceil(items.length / per_page)
  return {
    currentPage,
    per_page,
    pre_page: currentPage - 1 ? currentPage - 1 : null,
    next_page: (total_pages > currentPage) ? currentPage + 1 : null,
    total: items.length,
    total_pages,
    data: paginatedItems,
  }
}

const filterDataBySearch = () => {
  if (data.value) {
    const temp = data.value.filter(item => item.name.includes(searchThis.value) || item.teaser.includes(searchThis.value) || item.prompt.includes(searchThis.value))
    filteredDataBySearch.value = temp
    filteredData.value = Paginator(temp, page.value, perPage.value)
  }
  else {
    filteredDataBySearch.value = data.value
  }
}

const getDataByPage = (pageNum) => {
  console.log(filteredData.value.items.length, pageNum)
  // const offset = perPage.value * (pageNum - 1)
  // const totalPages = Math.ceil(filteredData.value.items.length / perPage.value)
  // const paginatedItems = filteredData.value.items.slice(offset, perPage.value * pageNum)

  // return {
  //   previousPage: pageNum - 1 ? pageNum - 1 : null,
  //   nextPage: totalPages > page ? pageNum + 1 : null,
  //   total: filter.length,
  //   totalPages,
  //   items: paginatedItems,
  // }
}

watch(
  () => data.value, (newVal, oldVal) => {
    filterDataBySearch()
    // ip address input validation
    // filterData()
  },

  { deep: true },
)
// watch(
//   () => page.value, (newVal, oldVal) => {
//     // ip address input validation
//     // filterData()
//     getDataByPage(page.value)
//   },

//   { deep: true },
// )
watch(
  () => searchThis.value, (newVal, oldVal) => {
    // ip address input validation
    page.value = 1
    filterDataBySearch()
    // filterData()
  },

  { deep: true },
)

onMounted(() => {
  console.log('mounted')
  filterDataBySearch()
  // filteredDataBySearch.value = data.value
})

const toInput = (item) => {
  emit('addToInput', item)
}

const goToPage = (p) => {
  page.value = p
  filteredData.value = Paginator(filteredDataBySearch.value, page.value, perPage.value)
}
const cols = ref([
  {
    field: 'name',
    title: 'Name',
  },
  {
    field: 'name',
    title: 'Name',
  },
])
</script>

<template>
  <div>
    <div class="overflow-x-auto">
      <div class="flex gap-3">
        <input
          id="api-key"
          v-model="searchThis"
          class="input input-bordered  w-full mb-3"
          type="text"
          placeholder="Filter and search"
        >
        <div>
          <div class="form-control">
            <label class="input-group">
              <span>Page</span>
              <input v-model="page" type="text" placeholder="10" class="input input-bordered w-16">
              <span @click="goToPage(page)">GO</span>
            </label>
          </div>
        </div>
      </div>

      <table class="table w-full table-compact">
        <!-- head -->
        <thead v-if="filteredData">
          <tr>
            <th>Title</th>
            <th class="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody v-if="isLoading">
          <div class="flex flex-col text-center m-auto items-center">
            <img src="/loading.gif" alt="" class="text-center" width="250">
            <h2 class="text-lg font-bold mb-4 text-center text-white">
              Please Wait
            </h2>
          </div>
        </tbody>
        <tbody v-if="filteredData">
          <tr
            v-for="(item, index) in filteredData.data"
            :key="index"
            class="w-full"
          >
            <td class="break-words whitespace-pre-wrap w-4/5">
              {{ item.name }}
            </td>

            <td class="text-center w-1/5">
              <button
                class="btn btn-success btn-xs"
                @click="toInput(item)"
              >
                USE
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex flex-col text-center m-auto items-center mt-3">
        <div v-if="filteredData" class="flex flex-row btn-group">
          <button class="btn" @click="goToPage(page - 1)">
            «
          </button>
          <button class="btn">
            Page {{ page }} / {{ filteredData.total_pages }}
          </button>
          <button class="btn" @click="goToPage(page + 1)">
            »
          </button>
        </div>
      </div>

      <!-- <Paginate
        v-if="filteredData"
        class=""
        :per-page="10"
        :total-pages="filteredData.total_pages"
        :current-page="page"
        :max-pages="8"
        wrapper-classes="btn-group"
        active-page-classes="btn-active"
        page-classes="btn"
        @input="goToPage"
      >
        <template #first>
          <NavButton
            text="First"
            page="first"
            class="btn btn-xs btn-outline"
          />
        </template>

        <template #last>
          <NavButton
            text="Last"
            page="last"
            class="btn btn-xs btn-outline"
          />
        </template>
      </Paginate> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bh-pagination {
  color: white !important;
}
</style>
