<template>
  <div class="filter">
    <filter-categories
      @select-category="selectCategory"
      :selectedCategory="selectedCategory"
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
    selectedCategory: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {},
  methods: {
    selectCategory (category) {
      this.$emit('select-category', category)
    }
  }
}
</script>

<style>

</style>
