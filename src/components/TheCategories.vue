<template>
  <div class="categories">
    <category-item
      v-for="category in categoryItems"
      :key="category.value"
      :category="category"
      @select-category="selectCategory(category.value)"
      :selectedCategory="selectedCategory"
    />
  </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue'
export default {
  components: {
    CategoryItem
  },
  props: {
    selectedCategory: {
      type: String,
      requiired: true,
      default: ''
    }
  },
  emits: {
    "select-category": value => typeof value === "string"
  },
  data () {
    return {
      categoryItems: [
        {
          title: 'Все',
          value: ''
        },
        {
          title: 'Штаны',
          value: 'trousers'
        },
        {
          title: 'Футболки',
          value: 't-short'
        },
        {
          title: 'Худи',
          value: 'hoodie'
        }
      ]
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
.categories {
    width: 200px;
}
</style>
