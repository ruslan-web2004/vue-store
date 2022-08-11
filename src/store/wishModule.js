export const wishesModule = {
  state: () => ({
    wishes: []
  }),
  getters: {
    getWishes (state) {
      return state.wishes
    },
    getWishesCount (state) {
      return state.wishes.length
    }
  },
  mutations: {
    addToWishes (state, item) {
      state.wishes.push(item)
    },
    removeFromWishes (state, item) {
      state.wishes.forEach((wish, index) => {
        if (wish.id == item.id) {
          state.wishes.splice(index, 1)
        }
      })
    }
  },
  actions: {
    addToWishes ({ state, commit }, item) {
      let isWishExists = false
      if (state.wishes.length > 0) {
        state.wishes.forEach(wish => {
          if (
            wish.id == item.id &&
            wish.color.title == item.color.title
          ) {
            isWishExists = true
          }
        })
      }
      if (isWishExists) {
        return
      } else {
        commit('addToWishes', item)
      }
    },
    removeFromWishes ({ commit }, item) {
      commit('removeFromWishes', item)
    }
  },
  namespaced: true
}
