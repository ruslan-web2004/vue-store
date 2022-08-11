<template>
  <div class="wish-list-item">
    <router-link :to="{ name: 'productPage', params: { id: wish.id } }">
      <div class="wish-list-item__image">
        <img :src="wish.image" alt="" />
      </div>
    </router-link>
    <div class="wish-list-item__title">{{ wish.title }}</div>
    <div class="wish-list-item__color">Цвет: {{ wish.color.title }}</div>
    <div class="wish-list-item__content">
      <div class="wish-list-item__price">
        <span>{{ wish.price }}</span>
      </div>
      <button class="wish-list-item__button" @click="$emit('remove-from-wishes')">
        <img src="../assets/icons/remove.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wish: {
      type: Object,
      required: true,
      default: {}
    }
  },
  emits: {
    'remove-from-wishes': null
  }
}
</script>

<style lang="scss">
.wish-list-item {
  padding: 15px;
  // .wish-list-item__image

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

  // .wish-list-item__title

  &__title {
    font-size: 14px;
    color: gray;
    margin-bottom: 15px;
    height: 35px;
  }

  // .wish-list-item__color

  &__color {
    font-size: 14px;
    color: gray;
    margin-bottom: 15px;
  }

  // .wish-list-item__content

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // .wish-list-item__price

  &__price {
  }

  // .wish-list-item__button

  &__button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 30px;
    height: 30px;
    & img {
      width: 100%;
    }
  }
}
</style>
