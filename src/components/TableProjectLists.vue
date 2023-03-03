<script setup>

</script>

<template>
  <div>
    <div>
      <div class="w-full flex lg:flex-row flex-col-reverse gap-3">
        <div class=" w-full lg:w-2/3  overflow-x-auto ">
          <div class="w-full align-middle inline-block  shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>

                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(api, index) in listApi.getApiList().value" :key="index">
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm leading-5 font-medium text-gray-900">
                          {{ cencorString(api.api_key) }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div class="text-sm leading-5 text-gray-900">
                      {{ api.remarks }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >Active</span>
                  </td>

                  <td
                    class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                  >
                    <div class="flex gap-3">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                      <a href="#" class="text-indigo-600 hover:text-indigo-900" @click="deleteApi(api.api_key)">Delete</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- add  -->
        <div class="lg:w-1/3 w-full  overflow-x-auto ">
          <div class="w-full align-middle inline-block  shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <div class="flex flex-wrap  bg-white">
              <div class="w-full  p-3  md:mb-0">
                <label class="block uppercase tracking-wide text-black text-xs font-bold mb-1" for="new-api-key">
                  API KEY
                </label>
                <input
                  id="new-api-key" v-model="newApiData.api_key"
                  class="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white"
                  type="text" placeholder="sk-***********************"
                >
              </div>
            </div>
            <div class="flex flex-wrap bg-white">
              <div class="w-full  p-3  md:mb-0">
                <label class="block uppercase tracking-wide text-black text-xs font-bold mb-1" for="new-remarks">
                  REMARKS
                </label>
                <input
                  id="new-remarks" v-model="newApiData.remarks"
                  class="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  type="text" placeholder="Add your remarks / note here"
                >
              </div>
            </div>
            <div class="flex flex-wrap bg-white">
              <div class="w-full  p-3  md:mb-0">
                <button
                  class="appearance-none block md:w-1/3 w-full m-auto bg-gray-300 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none hover:bg-gray hover:shadow"
                  @click="addOrSaveNewApi"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
