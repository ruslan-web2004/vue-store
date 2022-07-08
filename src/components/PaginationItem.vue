<template>
  <button class="pagination__item" @click="$emit('select-page')" :class="{ active: page == selectedPage }">
    {{ page }}
  </button>
</template>

<script>
export default {
  props: {
    selectedPage: {
      type: [Number, String],
      required: true,
      default: 1
    },
    page: {
      type: Number,
      required: true,
      default: 1
    }
  },
  emits: {
    "select-page": null
  }
}
</script>

<style lang="scss">
.pagination__item {
  padding: 10px;
  cursor: pointer;
  border: 1px solid black;
  background-color: transparent;
  &:hover,
  &.active {
    color: red;
  }
}
</style>
