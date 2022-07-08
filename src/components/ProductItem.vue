<template>
  <article class="product">
    <router-link :to="{ name: 'productPage', params: { id: product.id } }">
      <div class="product__image">
        <img :src="product.images[0]" alt="" />
      </div>
    </router-link>
    <div class="product__body">
      <p class="product__title">{{ product.title }}</p>
      <div class="product__content">
        <span class="product__price">{{ product.price }}</span>
        <div class="product__content-block">
          <button class="product__btn" @click="$emit('open-popup')">
            <img src="../assets/icons/cart.svg" alt="" />
          </button>
          <button @click="createItem" class="product__btn">
            <img v-if="!isItemExists" src="../assets/icons/wish.svg" alt="" />
            <img v-else src="../assets/icons/active-wish.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: {}
    }
  },
  emits: {
    "open-popup": null
  },
  computed: {
    ...mapGetters({
      wishItems: 'wish/getWishItems'
    }),
    isItemExists () {
      let bool = false
      this.wishItems.forEach(item => {
        if (item.id == this.product.id) {
          bool = true
        }
      })
      return bool
    }
  },
  methods: {
    addWish (item) {
      this.$store.dispatch('wish/addWish', item)
    },
    createItem () {
      const item = {
        id: this.product.id,
        image: this.product.images[0],
        title: this.product.title,
        category: this.product.category,
        price: this.product.price
      }
      this.addWish(item)
    }
  }
}
</script>
<style lang="scss">
.product {
  position: relative;
  padding: 10px;
  &:hover {
    .product__actions {
      opacity: 1;
      visibility: visible;
    }
  }
  // .product__image

  &__image {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 0;
    padding-bottom: 133%;
    & img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  // .product__body

  &__body {
  }

  // .product__title

  &__title {
    font-size: 14px;
    color: gray;
    margin-bottom: 25px;
    height: 35px;
  }

  // .product__colors

  &__colors {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }

  // .product__color

  &__color {
    width: 22px;
    height: 22px;
    border-radius: 100%;
    border: none;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      width: 28px;
      height: 28px;
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

  // .product__content

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // .product__content-block

  &__content-block {
    display: flex;
    gap: 10px;
  }

  // .product__price

  &__price {
  }

  // .product__btn

  &__btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    & img {
      width: 20px;
      height: 20px;
    }
    &.active {
      border: 1px solid black;
    }
  }
}
</style>
