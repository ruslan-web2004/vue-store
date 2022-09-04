<template>
  <div class="filter">
    <filter-categories
      class="filter__categories"
      @select-category="selectCategory"
      :selectedCategory="category"
    />
  </div>
</template>

<script>
import FilterCategories from './FilterCategories.vue'
export default {
  components: {
    FilterCategories
  },
  emits: {
    'select-category': value => typeof value === 'object'
  },
  props: {
    category: {
      type: Object,
      required: true,
      default: ''
    }
  },
  methods: {
    selectCategory (category) {
      this.$emit('select-category', category)
    }
  }
}
</script>

<style>

</style>
