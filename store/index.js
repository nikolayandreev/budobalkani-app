export const state = () => ({
  token: null,
  token_expires: null,
  customer_token: null,
  customer_token_expires: null,
  loggedIn: false,
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
  deleteCustomerToken(state, payload) {
    state.customer_token = null;
    state.customer_token_expires = null;
    state.loggedIn = false;
  },
  setCustomerToken(state, payload) {
    state.customer_token = payload.token
    state.customer_token_expires = payload.token_expires
    state.loggedIn = true
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

  setCustomerToken({ commit }, payload) {
    commit('setCustomerToken', payload)
  },

  logoutCustomer({ commit }) {
    commit('deleteCustomerToken');
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
