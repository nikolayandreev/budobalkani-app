export const state = () => ({
  addresses: null,
  orders: null,
  wishlist: null,
  cart: null,
})

export const mutations = {
  setAddresses(state, payload) {
    state.addresses = payload
  },
}

export const actions = {
  async changeAddresses({ commit }, payload) {
    commit('setAddresses', payload)
  },
}

export const getters = {
  getAddresses(state) {
    return state.addresses
  },
}
