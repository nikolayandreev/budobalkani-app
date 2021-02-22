export const state = () => ({
  categories: null,
  brands: null,
  cart: null,
  baseQuery: null,
  productTypes: [
    { slug: 'ekipi', id: process.env.PT_EKIPI },
    { slug: 'oblekla', id: process.env.PT_OBLEKLA },
    { slug: 'uredi-i-oborudvane', id: process.env.PT_UREDI },
    { slug: 'protektori', id: process.env.PT_PROTEKTORI },
    { slug: 'kolani', id: process.env.PT_KOLANI },
    { slug: 'sakove-i-chanti', id: process.env.PT_SAKOVE },
    { slug: 'videomateriali-i-literatura', id: process.env.PT_VIDEOMATERIALI },
    { slug: 'podaratsi', id: process.env.PT_PODARATSI }
  ],
  suitable: [
    { slug: 'majko', id: process.env.ST_MEN },
    { slug: 'damsko', id: process.env.ST_WOMEN },
    { slug: 'za-deteto', id: process.env.ST_CHILDREN },

  ]
})

export const mutations = {
  setCategories(state, payload) {
    state.categories = payload
  },
  setBrands(state, payload) {
    state.brands = payload
  },
  setBaseQuery(state, payload) {
    state.baseQuery = payload
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('getCategories')
    await dispatch('getBrands')
  },

  async getCategories({ commit }) {
    await this.$axios
      .$get('/api/categories?pagination=0')
      .then((res) => commit('setCategories', res.data))
      .catch((err) => console.error(err))
  },

  async getBrands({ commit }) {
    await this.$axios
      .$get(
        `/api/attributes/${process.env.BRANDS_ATTRIBUTE_ID}`
      )
      .then((res) => commit('setBrands', res.data.options))
      .catch((err) => console.error(err))
  },
  changeBaseQuery({ commit }, payload) {
    commit('setBaseQuery', payload);
  }
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getBrands(state) {
    return state.brands
  },
  getBaseQuery(state) {
    return state.baseQuery
  },
  getProductTypes(state) {
    return state.productTypes
  }
}
