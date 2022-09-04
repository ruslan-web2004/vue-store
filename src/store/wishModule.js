export const wishesModule = {
  state: () => ({
    wishes: []
  }),
  mutations: {
    addToWishes (state, item) {
      let isWishExists = false
      if (state.wishes.length) {
        state.wishes.forEach(wish => {
          if (
            wish.id == item.id &&
            wish.color.title == item.color.title
          ) {
            isWishExists = true
          }
        })
      }
      if (isWishExists) return
      state.wishes.unshift(item)
    },
    removeFromWishes (state, item) {
      state.wishes.forEach((wish, index) => {
        if (wish.id == item.id) {
          state.wishes.splice(index, 1)
        }
      })
    }
  },
  namespaced: true
}
