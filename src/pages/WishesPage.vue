<template>
  <section class="wishes">
    <div class="container">
      <div class="wishes__inner">
        <div class="wishes__title">Товары: ({{ count }})</div>
        <div class="wishes__items" v-if="wishes.length > 0">
          <wishes-item
            class="wishes__item"
            v-for="wish in wishes"
            :key="wish.id"
            :wish="wish"
            @remove-from-wishes="removeFromWishes(wish)"
          />
        </div>
        <div v-else class="wishes__empty">Ваш список желаний пуст</div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import WishesItem from '../components/WishesItem.vue'
import useConfirmBeforeActions from '../useConfirmBeforeActions'
export default {
  components: {
    WishesItem
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      wishes: state => state.wishes.wishes,
      count: state => state.wishes.wishes.length
    })
  },
  methods: {
    removeFromWishes (wish) {
      useConfirmBeforeActions(
        () => {
          this.$store.commit('wishes/removeFromWishes', wish)
        },
        { title: 'Удалить товар', question: 'Удалить товар из избранного?' }
      )
    }
  }
}
</script>

<style lang="scss">
.wishes {
  // .wishes__title

  &__title {
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 25px;
  }

  // .wishes__items

  &__items {
    display: flex;
    flex-wrap: wrap;
  }

  // .wishes__item


  &__item {
    flex: 0 0 25%;
    @media screen and (max-width: 1100px) {
      flex: 0 0 33%;
    }
    @media screen and (max-width: 650px) {
      flex: 0 0 50%;
    }
  }

  // .wishes__empty

  &__empty {
    font-size: 35px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
