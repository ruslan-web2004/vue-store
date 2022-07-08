<template>
  <popup-overlay @close="close">
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
            <div class="popup-product__size-title">Выберите размер</div>
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
        <div class="popup-product__add">
          <button class="popup-product__add-btn" @click="createItem">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </popup-overlay>
</template>

<script>
import PopupOverlay from './PopupOverlay.vue'
import ProductSlider from './ProductSlider.vue'
import fetchProduct from '../fetchProduct'
export default {
  components: {
    PopupOverlay,
    ProductSlider
  },
  props: {
    popupProductId: {
      type: [Number, String],
      required: true,
      default: null
    }
  },
  emits: {
    "close": null
  },
  data () {
    return {
      product: {},
      colors: [],
      groupProducts: [],
      size: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    changeSize (size) {
      this.size = size
    },
    changeColor (id) {
      this.product = this.groupProducts[id]
    },
    addToCart (item) {
      this.$store.dispatch('cart/addToCart', item)
    },
    createItem () {
      const item = {
        id: this.product.id,
        image: this.product.images[0],
        title: this.product.title,
        color: this.product.color,
        size: this.size,
        category: this.product.category,
        price: this.product.price,
        quantity: 1
      }
      this.addToCart(item)
    }
  },
  created () {
    fetchProduct(this.popupProductId).then(response => {
      this.product = response
      this.colors = response.colors
      this.groupProducts = response.groupProducts
    })
  }
}
</script>

<style lang="scss">
.popup-product {
  display: flex;
  gap: 30px;
  min-height: 70vh;
  min-width: 70vw;
  max-width: 70vw;

  // .popup-product__slider

  &__slider {
    flex: 1 1 0;
    min-width: 0;
  }

  // .popup-product__info

  &__info {
    flex: 1 1 0;
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

  // .popup-product__add

  &__add {
  }

  // .popup-product__add-btn

  &__add-btn {
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
  }
}
</style>
