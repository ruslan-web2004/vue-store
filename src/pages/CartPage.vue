<template>
  <section class="cart">
    <div class="container">
      <div class="cart__arrange" v-if="cartItems.length">
        <div class="cart__bag">
          <div class="cart__bag-head">
            <button class="cart__clean" @click="confirmCleanCart">
              Удалить все
            </button>
          </div>
          <div class="cart__bag-items">
            <cart-item
              class="cart__bag-item"
              v-for="item in cartItems"
              :key="item.title"
              :item="item"
              @remove-from-cart="removeFromCartConfirm(item)"
              @add-to-wishes="addToWishesConfirm(item)"
            />
          </div>
        </div>
        <div class="cart__summary">
          <div class="cart__summary-head">
            <button class="cart__summary-button">Перейти к оформлению</button>
            <p class="cart__summary-description">
              Доступные способы и время доставки можно выбрать при оформлении
              заказа
            </p>
          </div>
          <div class="cart__summary-content">
            <div class="cart__summary-title">Итого к оплате</div>
            <div class="cart__summary-price">
              <span>{{ totalPrice }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cart__empty" v-else>
        <span>Ваша корзина пуста</span>
      </div>
      <transition name="show"> </transition>
    </div>
  </section>
</template>

<script>
import CartItem from '../components/CartItem.vue'
import { mapActions, mapGetters } from 'vuex'
import useConfirmBeforeActions from '../useConfirmBeforeActions'
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
    ...mapActions({
      cleanCart: 'cart/cleanCart'
    }),
    removeFromCart (item) {
      this.$store.dispatch('cart/removeFromCart', item)
    },
    removeFromCartConfirm (item) {
      useConfirmBeforeActions(
        () => {
          this.removeFromCart(item)
        },
        {
          title: 'Удалить товар',
          question: 'Вы действительно хотите удалить этот товар?'
        }
      )
    },
    addToWishes (product) {
      const item = {
        id: product.id,
        image: product.image,
        title: product.title,
        color: product.color,
        price: product.price
      }
      this.$store.dispatch('wishes/addToWishes', item)
    },
    addToWishesConfirm(item) {
      useConfirmBeforeActions(
        () => {
          this.addToWishes(item)
          this.removeFromCart(item)
        },
        {
          title: 'Переместить товар',
          question: 'Вы действительно хотите переместить этот товар из корзины в избранное?'
        }
      )
    },
    confirmCleanCart () {
      useConfirmBeforeActions(
        () => {
          this.cleanCart()
        },
        {
          title: 'Удалить товары',
          question: 'Вы действительно хотите удалить все товары?'
        }
      )
    }
  }
}
</script>

<style lang="scss">
.cart {
  // .cart__arrange

  &__arrange {
    display: flex;
    gap: 20px;
    @media screen and (max-width: 992px) {
      flex-direction: column;
    }
  }

  // .cart__bag

  &__bag {
    background-color: white;
    padding: 15px;
    flex: 1 1 auto;
  }

  // .cart__bag-head

  &__bag-head {
    padding-bottom: 10px;
    border-bottom: 1px solid #eff3f6;
  }

  // .cart__clean

  &__clean {
    border: none;
    color: #f91155;
    font-size: 14px;
    background-color: transparent;
    cursor: pointer;
  }

  // .cart__bag-items

  &__bag-items {
    display: flex;
    flex-direction: column;
  }

  // .cart__bag-item

  &__bag-item {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  // .cart__summary

  &__summary {
    background-color: white;
    padding: 20px;
    flex: 0 0 33%;
    align-self: flex-start;
  }

  // .cart__summary-head

  &__summary-head {
    padding-bottom: 20px;
    border-bottom: 1px solid #eff3f6;
  }

  // .cart__summary-button

  &__summary-button {
    border: none;
    width: 100%;
    text-align: center;
    background-color: #10c44c;
    color: white;
    border-radius: 12px;
    min-height: 56px;
    min-width: 224px;
    padding: 0 24px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity ease 0.15s;
    margin-bottom: 15px;
    &:hover {
      opacity: 0.8;
    }
  }

  // .cart__summary-description

  &__summary-description {
    color: #808d9a;
    @media screen and (max-width: 992px) {
      font-size: 14px;
    }
  }

  // .cart__summary-content

  &__summary-content {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
  }

  // .cart__summary-title

  &__summary-title {
    font-size: 18px;
    color: #001a34;
  }

  // .cart__summary-price

  &__summary-price {
    font-weight: 700;
    font-size: 24px;
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
