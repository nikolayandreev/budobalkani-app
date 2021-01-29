export default function ({ $axios, store }) {
  $axios.interceptors.request.use((config) => {
    const token = store.state.token || null
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  })
}
