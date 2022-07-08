<template>
  <button @click="$emit('select-category')"
    class="categories__item"
    :class="{ active: category.value == selectedCategory }"
  >
    <span>{{ category.title }}</span>
  </button>
</template>
<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
    selectedCategory: {
      type: String,
      required: true
    }
  },
  emits: {
  "select-category": null
  }
}
</script>
<style lang="scss">
.categories__item {
  width: 100%;
  padding: 10px 20px;
  background-color: lightgrey;
  border: 1px solid black;
  cursor: pointer;
  opacity: 0.5;
  &:hover, &.active {
    opacity: 1;
  }
}
</style>
