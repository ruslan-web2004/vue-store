import axios from 'axios'

export const productsModule = {
  state: () => ({
    category: {
      title: 'Все',
      value: ''
    },
    page: 1,
    limit: 4,
    products: [],
    isLoading: true,
    totalResults: 0
  }),
  getters: {
    getTotalPages (state) {
      return Math.ceil(state.totalResults / state.limit)
    }
  },
  mutations: {
    setCategory (state, payload) {
      state.category = payload
    },
    setPage (state, payload) {
      state.page = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setLoading (state, payload) {
      state.isLoading = payload
    },
    setTotalResults (state, payload) {
      state.totalResults = payload
    }
  },
  actions: {
    async fetchProducts ({ state, commit }) {
      commit('setLoading', true)
      try {
        const response = await axios.get(
          'https://6295cdfa810c00c1cb680de8.mockapi.io/products-min',
          {
            params: {
              category: state.category.value,
              page: state.page,
              limit: state.limit
            }
          }
        )
        commit('setProducts', response.data.data)
        commit('setTotalResults', response.data.count)
      } catch (error) {
        console.log(error)
      } finally {
        commit('setLoading', false)
      }
    }
  },
  namespaced: true
}
