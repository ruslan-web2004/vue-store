<template>
  <popup-overlay @close="$emit('close')" :isLoading="isLoading">
    <div class="popup-product">
      <product-slider class="popup-product__slider" :images="product.images" />
      <div class="popup-product__info">
        <div class="popup-product__head">
          <h1 class="popup-product__head-title">{{ product.title }}</h1>
          <div class="popup-product__head-price">
            <span>{{ product.price }}</span>
          </div>
        </div>
        <div class="popup-product__select-box">
          <div class="popup-product__color">
            <div class="popup-product__color-title">Цвет: <span></span></div>
            <div class="popup-product__color-items">
              <button
                class="popup-product__color-item"
                v-for="(color, index) in colors"
                :key="color"
                :class="{ active: color.value == this.product.color.value }"
                @click="changeColor(index)"
                :style="{ background: color.value }"
              ></button>
            </div>
          </div>
          <div class="popup-product__size">
            <div class="popup-product__size-title">
              Выберите размер
              <span v-if="error" class="popup-product__size-title-error"
                >Пожалуйста, выберите размер</span
              >
            </div>
            <div class="popup-product__size-items">
              <button
                class="popup-product__size-item"
                v-for="size in product.sizes"
                :key="size"
                :class="{ active: size == this.size }"
                @click="changeSize(size)"
              >
                {{ size }}
              </button>
            </div>
          </div>
        </div>
        <div class="popup-product__buttons">
          <button class="popup-product__cart-btn" @click="addToCart">
            <span>Добавить в корзину</span>
          </button>
          <button class="popup-product__wish-btn" @click="addToWishes">
            <transition name="fade" mode="out-in">
              <img v-if="!isWishExists" src="../assets/icons/wish.svg" />
              <img v-else src="../assets/icons/active-wish.svg" />
            </transition>
          </button>
        </div>
      </div>
    </div>
  </popup-overlay>
</template>

<script>
import PopupOverlay from './PopupOverlay.vue'
import ProductSlider from './ProductSlider.vue'
import { mapState } from 'vuex'
import shake from '../animations/shake'
export default {
  components: {
    PopupOverlay,
    ProductSlider
  },
  props: {
    productId: {
      type: [Number, String],
      required: true,
      default: null
    }
  },
  emits: {
    close: null
  },
  data () {
    return {
      size: '',
      error: false
    }
  },
  methods: {
    changeSize (size) {
      this.size = size
    },
    changeColor (index) {
      this.$store.commit('currentProduct/setProduct', this.groupProducts[index])
    },
    addToCart () {
      if (this.size) {
        const item = {
          id: this.product.id,
          image: this.product.images[0],
          title: this.product.title,
          color: this.product.color,
          size: this.size,
          price: this.product.price,
          quantity: 1
        }
        this.$store.commit('cart/addToCart', item)
      } else {
        shake('.popup-product__size-items')
        this.error = true
      }
    },
    addToWishes () {
      const wish = {
        id: this.product.id,
        image: this.product.images[0],
        title: this.product.title,
        color: this.product.color,
        price: this.product.price
      }
      this.isWishExists
        ? this.$store.commit('wishes/removeFromWishes', wish)
        : this.$store.commit('wishes/addToWishes', wish)
    }
  },
  computed: {
    ...mapState({
      wishes: state => state.wishes.wishes,
      product: state => state.currentProduct.product,
      colors: state => state.currentProduct.colors,
      groupProducts: state => state.currentProduct.groupProducts,
      isLoading: state => state.currentProduct.isLoading
    }),
    isWishExists () {
      let bool = false
      this.wishes.forEach(item => {
        if (
          item.id == this.product.id &&
          item.color.title == this.product.color.title
        ) {
          bool = true
        }
      })
      return bool
    }
  },
  created () {
    this.$store.dispatch('currentProduct/fetchProduct', this.productId)
  }
}
</script>

<style lang="scss">
.popup-product {
  max-width: 70vw;
  max-height: 70vh;
  display: flex;
  @media screen and (max-width: 992px) {
    flex-direction: column;
    width: auto;
  }

  // .popup-product__slider

  &__slider {
    flex: 0 0 52%;
    padding-right: 30px;
    min-width: 0;
    @media screen and (max-width: 992px) {
      max-width: 400px;
      padding-right: 0;
      padding-bottom: 20px;
    }
  }

  // .popup-product__info

  &__info {
    flex: 1 1 auto;
  }

  // .popup-product__head

  &__head {
    border-bottom: 1px dashed #e5e5e5;
    padding-bottom: 25px;
    margin-bottom: 20px;
  }

  // .popup-product__head-title

  &__head-title {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 15px;
  }

  // .popup-product__head-price

  &__head-price {
    font-size: 20px;
    font-weight: 700;
  }

  // .popup-product__select-box

  &__select-box {
  }

  // .popup-product__color

  &__color {
  }

  // .popup-product__color-title

  &__color-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    & span {
      color: grey;
    }
  }

  // .popup-product__color-items

  &__color-items {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  // .popup-product__color-item

  &__color-item {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: none;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      width: 34px;
      height: 34px;
      background: transparent;
      border: 1px solid black;
      border-radius: 100%;
      opacity: 0;
    }
    &:hover {
      &::before {
        opacity: 0.5;
      }
    }
    &.active {
      &::before {
        opacity: 1;
      }
    }
  }

  // .popup-product__size

  &__size {
  }

  // .popup-product__size-title

  &__size-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  // .popup-product__size-title-error

  &__size-title-error {
    font-size: 14px;
    color: red;
    margin-left: 10px;
  }

  // .popup-product__size-items

  &__size-items {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  // .popup-product__size-item

  &__size-item {
    min-width: 66px;
    border-radius: 16px;
    border: 1px solid black;
    background: transparent;
    padding: 0 12px;
    line-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    opacity: 0.5;
    &:hover,
    &.active {
      opacity: 1;
    }
  }

  // .popup-product__buttons

  &__buttons {
    display: flex;
    gap: 15px;
  }

  // .popup-product__cart-btn

  &__cart-btn {
    min-width: 225px;
    border: 1px solid black;
    background-color: transparent;
    font-size: 20px;
    color: black;
    padding: 10px 20px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
      background-color: black;
      color: white;
    }
    &:disabled {
      background-color: black;
      color: white;
    }
  }

  // .popup-product__wish-btn

  &__wish-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    & img {
      width: 30px;
    }
  }
}

// Animation

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  transform: scale(0);
}
</style>
