export const state = () => ({
  addresses: null,
  orders: null,
  wishlist: null,
  cart: null,
  orders: null,
})

export const mutations = {
  setAddresses(state, payload) {
    state.addresses = payload
  },
  setOrders(state, payload) {
    state.orders = payload
  },
}

export const actions = {
  changeAddresses({ commit }, payload) {
    commit('setAddresses', payload)
  },
  async changeOrders({ commit }, payload) {
    return await this.$axios
      .$get(`/api/orders?token=true`)
      .then((res) => {
        commit('setOrders', res.data)
      })
      .catch((err) => console.error(err))
  },
}

export const getters = {
  getAddresses(state) {
    return state.addresses
  },
  getOrders(state) {
    return state.orders
  },
}
