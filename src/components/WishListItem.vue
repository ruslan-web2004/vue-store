<template>
  <div class="wish-list__item">
    <router-link :to="{ name: 'productPage', params: { id: item.id } }">
      <div class="wish-list__item-image">
        <img :src="item.image" alt="" />
      </div>
    </router-link>
    <div class="wish-list__item-title">{{ item.title }}</div>
    <div class="wish-list__item-content">
      <div class="wish-list__item-price">
        <span>{{ item.price }}</span>
      </div>
      <button class="wish-list__item-button" @click="$emit('remove-item')">
        <img src="../assets/icons/remove.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: {}
    }
  },
  emits: {
    "remove-item": null
  }
}
</script>

<style lang="scss">
.wish-list {
  // .wish-list__item

  &__item {
  }

  // .wish-list__item-image

  &__item-image {
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

  // .wish-list__item-title

  &__item-title {
    font-size: 14px;
    color: gray;
    margin-bottom: 15px;
    height: 35px;
  }

  // .wish-list__item-content

  &__item-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // .wish-list__item-price

  &__item-price {
  }

  // .wish-list__item-button

  &__item-button {
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
