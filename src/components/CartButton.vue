<template>
  <router-link to="cart" class="cart-button">
    <img class="cart-button__icon" src="../assets/icons/cart.svg" alt="cart" />
    <div class="cart-button__count" v-if="count > 0">
      <span>{{ count }}</span>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      count: 'cart/getCartItemsCount'
    })
  }
}
</script>

<style lang="scss">
.cart-button {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 30px;
  height: 30px;

  // .cart__icon

  &__icon {
    width: 100%;
  }

  // .cart__count

  &__count {
  }
}
</style>
