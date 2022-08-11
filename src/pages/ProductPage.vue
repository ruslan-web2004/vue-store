<template>
  <section class="product-intro">
    <div class="container">
      <div class="product-intro__inner">
        <transition name="fade" mode="out-in">
          <div v-if="isLoading" class="product-intro__loading">
            <loading v-model:active="isLoading" />
          </div>
          <div v-else class="product-intro__content">
            <product-slider
              class="product-intro__slider"
              :images="product.images"
            />
            <div class="product-intro__info">
              <div class="product-intro__head">
                <h1 class="product-intro__head-title">{{ product.title }}</h1>
                <div class="product-intro__head-price">
                  <span>{{ product.price }}</span>
                </div>
              </div>
              <div class="product-intro__select-box">
                <div class="product-intro__color">
                  <div class="product-intro__color-title">
                    Цвет: <span></span>
                  </div>
                  <div class="product-intro__color-items">
                    <button
                      class="product-intro__color-item"
                      v-for="(color, index) in colors"
                      :key="color"
                      :class="{
                        active: color.value == this.product.color.value
                      }"
                      @click="changeColor(index)"
                      :style="{ background: color.value }"
                    ></button>
                  </div>
                </div>
                <div class="product-intro__size">
                  <div class="product-intro__size-title">
                    Выберите размер
                    <span v-if="error" class="product-intro__size-title-error"
                      >Пожалуйста, выберите размер</span
                    >
                  </div>
                  <div ref="size" class="product-intro__size-items">
                    <button
                      class="product-intro__size-item"
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
              <div class="product-intro__buttons">
                <button class="product-intro__cart-btn" @click="addToCart">
                  <span>Добавить в корзину</span>
                </button>
                <button class="product-intro__wish-btn" @click="addToWishes">
                  <transition name="fade" mode="out-in">
                    <img v-if="!isWishExists" src="../assets/icons/wish.svg" />
                    <img v-else src="../assets/icons/active-wish.svg" />
                  </transition>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
import ProductSlider from '../components/ProductSlider.vue'
import fetchProduct from '../fetchProduct'
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import shake from '../animations/shake'
export default {
  components: {
    ProductSlider,
    Loading
  },
  data () {
    return {
      product: {},
      colors: [],
      groupProducts: [],
      size: '',
      isLoading: true,
      error: false
    }
  },
  methods: {
    changeSize (size) {
      this.size = size
    },
    changeColor (index) {
      this.product = this.groupProducts[index]
    },
    addToCart () {
      if (this.size !== '') {
        if (this.error) {
          this.error = false
        }
        const item = {
          id: this.product.id,
          image: this.product.images[0],
          title: this.product.title,
          color: this.product.color,
          size: this.size,
          price: this.product.price,
          quantity: 1
        }
        this.$store.dispatch('cart/addToCart', item)
      } else {
        shake('.product-intro__size-items')
        this.error = true
      }
    },
    removeFromWishes (wish) {
      this.$store.dispatch('wishes/removeFromWishes', wish)
    },
    addToWishes () {
      const wish = {
        id: this.product.id,
        image: this.product.images[0],
        title: this.product.title,
        color: this.product.color,
        price: this.product.price
      }
      if (this.isWishExists) {
        this.removeFromWishes(wish)
      } else {
        this.$store.dispatch('wishes/addToWishes', wish)
      }
    }
  },
  computed: {
    ...mapGetters({
      wishes: 'wishes/getWishes'
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
    fetchProduct(this.$route.params.id).then(response => {
      this.product = response
      this.colors = response.colors
      this.groupProducts = response.groupProducts
      this.isLoading = false
    })
  }
}
</script>
<style lang="scss">
.product-intro {

  // .product-intro__loading

  &__loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // .product-intro__content

  &__content {
    display: flex;
    gap: 30px;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  // .product-intro__slider

  &__slider {
    min-width: 0;
    flex: 1 1 0;
    @media screen and (max-width: 768px) {
      max-width: 400px;
    }
  }

  // .product-intro__infor

  &__info {
    flex: 1 1 0;
  }
  // .product-intro__head

  &__head {
    border-bottom: 1px dashed #e5e5e5;
    padding-bottom: 25px;
    margin-bottom: 20px;
  }

  // .product-intro__head-title

  &__head-title {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  // .product-intro__head-price

  &__head-price {
    font-size: 24px;
    font-weight: 700;
  }

  // .product-intro__color-title

  &__color-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    & span {
      color: grey;
    }
  }

  // .product-intro__color-items

  &__color-items {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  // .product-intro__color-item

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

  // .product-intro__size

  &__size {
  }

  // .product-intro__size-title

  &__size-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  // .product-intro__size-title-error

  &__size-title-error {
    font-size: 14px;
    color: red;
    margin-left: 10px;
  }

  // .product-intro__size-items

  &__size-items {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  // .product-intro__size-item

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

  // .product-intro__buttons

  &__buttons {
    display: flex;
    gap: 20px;
  }

  // .product-intro__cart-btn

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

  // .product-intro__wish-btn

  &__wish-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    & img {
      width: 35px;
    }
  }
}
</style>
