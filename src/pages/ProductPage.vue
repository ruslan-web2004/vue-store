<template>
  <div class="container">
    <div class="product-intro">
      <product-slider class="product-intro__slider" :images="product.images" />
      <div class="product-intro__info">
        <div class="product-intro__head">
          <h1 class="product-intro__head-title">{{ product.title }}</h1>
          <div class="product-intro__head-price">
            <span>{{ product.price }}</span>
          </div>
        </div>
        <div class="product-intro__select-box">
          <div class="product-intro__color">
            <div class="product-intro__color-title">Цвет: <span></span></div>
            <div class="product-intro__color-items">
              <button
                class="product-intro__color-item"
                v-for="(color, index) in colors"
                :key="color"
                :class="{ active: color.value == this.product.color.value }"
                @click="changeColor(index)"
                :style="{ background: color.value }"
              ></button>
            </div>
          </div>
          <div class="product-intro__size">
            <div class="product-intro__size-title">Выберите размер</div>
            <div class="product-intro__size-items">
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
        <div class="product-intro__add">
          <button class="product-intro__add-btn" @click="createItem">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductSlider from '../components/ProductSlider.vue'
import fetchProduct from '../fetchProduct'
export default {
  components: {
    ProductSlider
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
    fetchProduct(this.$route.params.id).then(response => {
      this.product = response
      this.colors = response.colors
      this.groupProducts = response.groupProducts
    })
  }
}
</script>
<style lang="scss">
.product-intro {
  display: flex;
  gap: 30px;

  &__slider {
    min-width: 0;
    flex: 1 1 0;
  }

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

  // .product-intro__add

  &__add {
  }

  // .product-intro__add-btn

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
