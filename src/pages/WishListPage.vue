<template>
  <div class="wish-list">
    <div class="container">
      <div class="wish-list">
        <div class="wish-list__title">Товары: ({{ count }})</div>
        <div class="wish-list__items" v-if="wishItems.length > 0">
          <wish-list-item
            v-for="item in wishItems"
            :key="item.id"
            :item="item"
            @remove-item="removeItem(item)"
          />
        </div>
        <div v-else class="wish-list__empty">Ваш список желаний пуст</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WishListItem from '../components/WishListItem.vue'
import useConfirmBeforeActions from '../useConfirmBeforeActions'
export default {
  components: {
    WishListItem
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      wishItems: 'wish/getWishItems',
      count: 'wish/getWishItemsCount'
    })
  },
  methods: {
    removeItem (item) {
      useConfirmBeforeActions(
        () => {
          this.$store.dispatch('wish/removeWish', item)
        },
        { title: 'Удалить товар', question: 'Удалить товар из избранного?' }
      )
    }
  }
}
</script>

<style lang="scss">
.wish-list {
  // .wish-list__title

  &__title {
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 25px;
  }

  // .wish-list__items

  &__items {
    display: grid;
    grid-template-columns: repeat(5, 167px);
    justify-content: space-between;
  }

  // .wish-list__empty

  &__empty {
    font-size: 35px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
