export const state = () => ({
  token: null,
});

export const mutations = {
  setToken(state, payload) {
    state.token = payload;
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('getToken')
  },

  async getToken({ commit }) {
    await this.$axios.$post('/wp-json/jwt-auth/v1/token', {
      username: 'budobalk',
      password: 'PRVny43BbkV3akYQNI'
    }).then(res => {
      commit('setToken', res.token ? res.token : null)
    }).catch(err => console.log(err));
  },

  refreshToken() {

  }
}

export const getters = {
  getToken(state) {
    return state.token;
  }
}
