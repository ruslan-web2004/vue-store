export const cartModule = {
  state: () => ({
    cartItems: []
  }),
  getters: {
    getCartItems (state) {
      return state.cartItems
    },
    getTotalPrice (state) {
      if (state.cartItems.length) {
        let result = []
        state.cartItems.forEach((item) => {
          result.push(item.price * item.quantity)
        })
        return result.reduce((acc, item) => acc + item, 0)
      } else {
        return 0
      }
    },
    getCartItemsCount (state) {
      return state.cartItems.reduce((acc, item) => acc + item.quantity, 0)
    }
  },
  mutations: {
    addToCart (state, item) {
      if (state.cartItems.length) {
        let isCartItemExists = false
        state.cartItems.map((cartItem) => {
          if (item.id == cartItem.id && item.size == cartItem.size) {
            isCartItemExists = true
            cartItem.quantity++
          }
        })
        if (!isCartItemExists) {
          state.cartItems.push(item)
        }
      } else {
        state.cartItems.push(item)
      }
    },
    removeFromCart (state, index) {
      state.cartItems.splice(index, 1)
    }
  },
  actions: {
    addToCart ({ commit }, item) {
      commit('addToCart', item)
    },
    removeFromCart ({ commit }, index) {
      commit('removeFromCart', index)
    }
  },
  namespaced: true
}
