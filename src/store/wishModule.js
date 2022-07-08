export const wishModule = {
  state: () => ({
    wishItems: []
  }),
  getters: {
    getWishItems (state) {
      return state.wishItems
    },
    getWishItemsCount (state) {
      return state.wishItems.length
    }
  },
  mutations: {
    addWish (state, item) {
      state.wishItems.push(item)
    },
    removeWish (state, item) {
      state.wishItems.forEach((wishItem, index) => {
        if (wishItem.id == item.id) {
          state.wishItems.splice(index, 1)
        }
      })
    }
  },
  actions: {
    addWish ({ state, commit }, item) {
      let isWishItemExists = false
      if (state.wishItems.length > 0) {
        state.wishItems.forEach((wishItem) => {
          if (wishItem.id == item.id) {
            isWishItemExists = true
          }
        })
      }
      if (isWishItemExists) {
        commit('removeWish', item)
      } else {
        commit('addWish', item)
      }
    },
    removeWish ({commit}, item) {
      commit('removeWish', item)
    }
  },
  namespaced: true
}
