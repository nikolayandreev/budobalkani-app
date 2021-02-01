export default function ({ $axios, store, redirect, nuxtError }) {
  $axios.interceptors.request.use((config) => {
  
    const token = store.state.token || null
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    
    return config
  })

  //  $axios.onError(error => {
  //   if(error.response.status === 500) {
  //     redirect('/sorry')
  //   } else if (error.response.status === 404) {
  //     return nuxtError();
  //   }
  // })
}
