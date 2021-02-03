export const state = () => ({
  wishlist: null,
})

export const mutations = {
  setWishlist(state, payload) {
    state.wishlist = payload
  },
  
  pushToWishlist(state, payload) {
    state.wishlist.push(payload)
  },
  
  deleteFromWIshlist(state, id) {
    const index = state.wishlist.findIndex((elem) => elem.id === id)
    return state.wishlist.splice(index, 1)
  },
  
  renewWishlist(state) {
    localStorage.setItem('budobalkani_wishlist', JSON.stringify(state.wishlist))
  },
}

export const actions = {
  initWishlist({ commit }, payload) {
    commit('setWishlist', payload)
  },
  
  addToWishLIst({ commit }, payload) {
    commit('pushToWishlist', payload)
  },
  
  removeFromWishlist({ commit }, payload) {
    commit('deleteFromWIshlist', payload)
  },
  
  updateWishlist({ commit }) {
    commit('renewWishlist')
  },
}

export const getters = {
  getWishlist(state) {
    return state.wishlist
  },
}
