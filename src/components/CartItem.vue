<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img :src="item.image" alt="" />
    </div>
    <div class="cart-item__info">
      <div class="cart-item__info-content">
        <div class="cart-item__title">{{ item.title }}</div>
        <div class="cart-item__description">
          <span>цвет {{ item.color.title }}, размер {{ item.size }}</span>
        </div>
        <div class="cart-item__buttons">
          <button class="cart-item__button">
            <span @click="addToWishes">В избранное</span>
          </button>
          <button class="cart-item__button" @click="removeFromCart">
            Удалить
          </button>
        </div>
      </div>
    </div>
    <div class="cart-item__price">{{ totalPrice }}</div>
    <div class="cart-item__quantity">
      <div
        class="cart-item__quantity-compute cart-item__quantity-compute--left"
        :class="{ disabled: item.quantity <= 1 }"
        @click="decrementQuantity"
      ></div>
      <input type="text" v-model="item.quantity" />
      <div
        class="cart-item__quantity-compute cart-item__quantity-compute--right"
        @click="incrementQuantity"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: null
    }
  },
  emits: {
    'remove-from-cart': null,
    'add-to-wishes': null
  },
  computed: {
    totalPrice () {
      return this.item.price * this.item.quantity
    }
  },
  methods: {
    incrementQuantity () {
      this.item.quantity++
    },
    decrementQuantity () {
      if (this.item.quantity > 1) {
        this.item.quantity--
      }
      return
    },
    removeFromCart () {
      this.$emit('remove-from-cart')
    },
    addToWishes () {
      this.$emit('add-to-wishes')
    }
  }
}
</script>

<style lang="scss">
.cart-item {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  padding: 5px 0;

  // .cart-item__image

  &__image {
    flex: 0 0 120px;
    & img {
      width: 100%;
      height: 100%;
    }
    margin-right: 20px;
    @media screen and (max-width: 540px) {
      flex: 0 0 80px;
      margin-right: 10px;
    }
  }

  // .cart-item__info

  &__info {
    flex: 1 1 auto;
    margin-right: 20px;
    @media screen and (max-width: 540px) {
      margin-right: 10px;
    }
  }

  // .cart-item__info-content

  &__info-content {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 190px;
    height: 100%;
  }

  // .cart-item__title

  &__title {
    font-size: 18px;
    color: #001a34;
  }

  // .cart-item__description

  &__description {
    color: #808d9a;
    font-size: 14px;
    flex: 1 0 auto;
  }

  // .cart-item__buttons

  &__buttons {
    display: flex;
    align-items: center;
    column-gap: 15px;
  }

  // .cart-item__button

  &__button {
    border: none;
    background-color: transparent;
    color: #005bff;
    cursor: pointer;
    &.active {
      color: #f91155;
      cursor: default;
    }
  }

  // .cart-item__price

  &__price {
    font-size: 18px;
    font-weight: 700px;
    color: #001a34;
    flex: 1 1 auto;
    min-width: 50px;
    margin-right: 20px;
    @media screen and (max-width: 540px) {
      margin-right: 10px;
    }
  }

  // .cart-item__quantity

  &__quantity {
    display: flex;
    & input {
      width: 34px;
      height: 28px;
      line-height: 28px;
      text-align: center !important;
      border: none;
      outline: 0;
      background: 0 0;
      color: #000;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      font-size: 13px;
    }
  }

  // .cart-item__quantity-compute

  &__quantity-compute {
    width: 25px;
    height: 28px;
    background: #fff;
    border: 1px solid #e6e6e6;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border: 1px solid #222;
      cursor: pointer;
    }
    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 2px;
      background-color: black;
    }
    &--left {
      border-radius: 50% 0 0 50%;
    }
    &--right {
      border-radius: 0 50% 50% 0;
      &::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: black;
      }
      &::before {
        transform: rotate(-90deg);
      }
    }
    &.disabled {
      &:hover {
        cursor: default;
        border: 1px solid #e6e6e6;
      }
      &::after {
        background-color: #e6e6e6;
      }
    }
  }
}
</style>
