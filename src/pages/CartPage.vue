<template>
  <div class="cart">
    <div class="cart__container container">
      <div class="cart__arrange" v-if="cartItems.length > 0">
        <div class="cart__items">
          <cart-item
            class="cart__item"
            v-for="(product, index) in cartItems"
            @remove-from-cart="removeFromCart(index)"
            :key="product.title"
            :product="product"
          />
        </div>
        <div class="cart__total-price">
          <span>Итого: </span>
          <span>{{ totalPrice }}</span>
        </div>
      </div>
      <div class="cart__empty" v-else>
        <span>Ваша корзина пуста</span>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    CartItem
  },
  props: {
    products: {
      type: Array,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'cart/getCartItems',
      totalPrice: 'cart/getTotalPrice'
    })
  },
  methods: {
    removeFromCart (index) {
      this.$store.dispatch('cart/removeFromCart', index)
    }
  }
}
</script>

<style lang="scss">
.cart {
  width: 100%;
  min-height: 50vh;
  // .cart__arrange

  &__arrange {
  }

  // .cart__items

  &__items {
  }

  // .cart__total-price

  &__total-price {
  }

  // .cart__empty

  &__empty {
    font-size: 32px;
    font-weight: 700;
    display: flex;
    justify-content: center;
  }
}
</style>
