<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img :src="product.image" alt="">
    </div>
    <div class="cart-item__title">
      <span>{{ product.title }}</span>
    </div>
    <div class="cart-item__color">
      <span>Цвет: {{ product.color.title }}</span>
    </div>
    <div class="cart-item__size">
      <span>Размер: {{ product.size }}</span>
    </div>
    <div class="cart-item__quantity">
      <span>Количество: {{ product.quantity }}</span>
    </div>
    <div class="cart-item__price">
      <span>Цена: {{ totalPrice }}</span>
    </div>
    <button class="cart-item__button" @click="$emit('remove-from-cart')">Remove</button>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: null
    }
  },
  emits: {
    "remove-from-cart": null
  },
  computed: {
    totalPrice() {
      return this.product.price * this.product.quantity
    }
  }
}
</script>

<style lang="scss">
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  gap: 20px;
  &:not(:last-child) {
    border-bottom: 1px solid gray;
  }

  // .cart-item__image

  &__image {
    width: 150px;
    & img {
      width: 100%;
      height: 100%;
    }
  }

  // .cart-item__title

  &__title {
    font-size: 14px;
    color: gray;
    text-align: center;
  }

  // .cart-item__price

  &__price {
    font-size: 18px;
    font-weight: 700px;
  }
}
</style>
