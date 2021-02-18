export const state = () => ({
  categories: null,
  tags: null,
  brands: null,
  cart: null,
})

export const mutations = {
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
    // await dispatch('getCategories')
    // await dispatch('getBrands')
    // await dispatch('getTags')
  },

  async getCategories({ commit }) {
    await this.$axios
      .$get('/wp-json/wc/v3/products/categories?per_page=100')
      .then((res) => commit('setCategories', res))
      .catch((err) => console.error(err))
  },

  async getBrands({ commit }) {
    await this.$axios
      .$get(
        `wp-json/wc/v3/products/attributes/${process.env.BRANDS_TAXONOMY_ID}/terms`
      )
      .then((res) => commit('setBrands', res))
      .catch((err) => console.error(err))
  },

  async getTags({ commit }) {
    await this.$axios
      .$get(`wp-json/wc/v3/products/tags?per_page=100`)
      .then((res) => commit('setTags', res))
      .catch((err) => console.error(err))
  },
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getBrands(state) {
    return state.brands
  },
}
