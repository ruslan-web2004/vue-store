import axios from 'axios'

export const currentProductModule = {
  state: {
    product: null,
    colors: [],
    groupProducts: [],
    isLoading: true
  },
  mutations: {
    setProduct (state, payload) {
      state.product = payload
    },
    setColors (state, payload) {
      state.colors = payload
    },
    setGroupProducts (state, payload) {
      state.groupProducts = payload
    },
    setLoading (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    async fetchProduct ({ commit }, id) {
      commit('setLoading', true)
      try {
        const response = await axios.get(
          `https://6295cdfa810c00c1cb680de8.mockapi.io/products/${id}`
        )
        commit('setProduct', response.data)
        commit('setColors', response.data.colors)
        commit('setGroupProducts', response.data.groupProducts)
      } catch (error) {
        console.log(error)
      } finally {
        commit('setLoading', false)
      }
    }
  },
  namespaced: true
}
