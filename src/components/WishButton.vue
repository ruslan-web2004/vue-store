<template>
  <router-link to="wishlist" class="wish-button">
    <img class="wish-button__icon" src="../assets/icons/wish.svg" alt="" />
    <div class="wish-button__count" v-if="count > 0">
      <span>{{ count }}</span>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      count: 'wish/getWishItemsCount'
    })
  }
}
</script>

<style lang="scss">
.wish-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  // .wish-button__icon

  &__icon {
    width: 100%;
  }
}
</style>
