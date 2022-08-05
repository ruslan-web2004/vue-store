import axios from 'axios'

export const productsModule = {
  state: () => ({
    products: [],
    isLoading: true,
    limit: 3
  }),
  getters: {
    getProducts (state) {
      return state.products
    },
    getIsLoading (state) {
      return state.isLoading
    }
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setIsLoading (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    async fetchProducts ({ state, commit }, payload) {
      commit('setIsLoading', true)
      const response = await axios.get(
        'https://6295cdfa810c00c1cb680de8.mockapi.io/products-min',
        {
          params: {
            page: payload.page,
            limit: state.limit,
            category: payload.category
          }
        }
      )
      commit('setProducts', response.data)
      commit('setIsLoading', false)
    }
  },
  namespaced: true
}
