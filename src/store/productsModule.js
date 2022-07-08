import axios from 'axios'

export const productsModule = {
  state: () => ({
    products: [],
    limit: 3
  }),
  getters: {
    getProducts (state) {
      return state.products
    }
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    }
  },
  actions: {
    async fetchProducts ({ state, commit }, payload) {
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
    }
  },
  namespaced: true
}
