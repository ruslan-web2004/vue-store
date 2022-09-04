export const cartModule = {
  state: () => ({
    cartItems: []
  }),
  getters: {
    getTotalPrice (state) {
      if (state.cartItems.length) {
        let result = []
        state.cartItems.forEach(item => {
          result.push(item.price * item.quantity)
        })
        return result.reduce((acc, item) => acc + item, 0)
      }
      return 0
    }
  },
  mutations: {
    addToCart (state, item) {
      let isCartItemExists = false
      if (state.cartItems.length) {
        state.cartItems.map(cartItem => {
          if (
            item.id === cartItem.id &&
            item.size === cartItem.size &&
            item.color.title === cartItem.color.title
          ) {
            isCartItemExists = true
            cartItem.quantity++
          }
        })
      }
      if (!isCartItemExists) state.cartItems.unshift(item)
    },
    removeFromCart (state, item) {
      state.cartItems.forEach((cartItem, index) => {
        if (
          cartItem.id === item.id &&
          cartItem.color.title === item.color.title &&
          cartItem.size === item.size
        ) {
          state.cartItems.splice(index, 1)
        }
      })
    },
    cleanCart (state) {
      state.cartItems = []
    }
  },
  namespaced: true
}
