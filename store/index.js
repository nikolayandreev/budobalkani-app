export const state = () => ({
  token: null,
  token_expires: null,
  categories: null,
  tags: null,
  brands: null,
  cart: null,
})

export const mutations = {
  setToken(state, payload) {
    state.token = payload.token
    state.token_expires = payload.token_expires
  },
  setCategories(state, payload) {
    state.categories = payload
  },
  setBrands(state, payload) {
    state.brands = payload
  },
  setTags(state, payload) {
    state.tags = payload
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('getToken')
    await dispatch('getCategories')
    await dispatch('getBrands')
    await dispatch('getTags')
  },

  async getToken({ commit }) {
    await this.$axios
      .$post('/wp-json/aam/v2/authenticate', {
        username: 'api',
        password: 'Ew%IwmpCT@LxVRw$3vN%H8XU',
        issueJWT: true,
      })
      .then(res => commit('setToken', res.jwt))
    .catch(err => console.log(err));
      // .then((res) => commit('setToken', res.data.token ? res.data.token : null))
      // .catch((err) => console.error(err))
  },

  async refreshToken({ commit }) {
    await this.$axios
      .$post('/wp-json/jwt-auth/v1/token/validate')
      .then((res) => commit('setToken', res.token ? res.token : null))
      .catch((err) => console.error(err))
  },

  async getCategories({ commit }) {
    await this.$axios
      .$get('/wp-json/wc/v3/products/categories?per_page=100')
      .then((res) => commit('setCategories', res))
      .catch((err) => console.error(err))
  },

  async getBrands({ commit }) {
    await this.$axios
      .$get(`wp-json/wc/v3/products/attributes/${process.env.BRANDS_TAXONOMY_ID}/terms`)
      .then((res) => commit('setBrands', res))
      .catch((err) => console.error(err))
  },

  async getTags({ commit }) {
    await this.$axios
      .$get(`wp-json/wc/v3/products/tags?per_page=100`)
      .then(res => commit('setTags', res))
      .catch(err => console.error(err));
  },
}

export const getters = {
  getToken(state) {
    return state.token
  },
  getCategories(state) {
    return state.categories
  },
  getBrands(state) {
    return state.brands
  },
}
