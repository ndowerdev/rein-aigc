import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_DB_URL)
const useDb = async function (username: string, password: string) {
  const authData = await pb.collection('users').authWithPassword(`${username}`, `${password}`)
  return authData
}

const apiKeyList = async () => {
  const records = await pb.collection('apis').getFullList(200, {
    filter: `owner = "${pb.authStore.model?.id}"`,
    sort: '-created',
  })
  return records
}

const projectLists = async () => {
  const records = await pb.collection('projects').getFullList(200, {
    filter: `project_owner = "${pb.authStore.model?.id}"`,
    sort: '-created',
  })
  return records
}

// const checkLogin = function () {
//   if (!pb)
//     // router.push('/auth/login')
// }

export { useDb, pb, apiKeyList, projectLists }
