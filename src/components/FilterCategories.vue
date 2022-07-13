<template>
  <div class="categories">
    <div class="categories__title" @click="openList">
      Категории
      <span v-if="!isListOpen">+</span>
      <span v-else>-</span>
    </div>
    <div class="categories__list" v-if="isListOpen">
      <form>
        <filter-categories-item
          class="categories__item"
          v-for="category in categoryItems"
          :key="category.value"
          :category="category"
          @select-category="selectCategory(category)"
          :selectedCategory="selectedCategory"
        />
      </form>
    </div>
  </div>
</template>

<script>
import FilterCategoriesItem from './FilterCategoriesItem.vue'
export default {
  components: {
    FilterCategoriesItem
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
      ],
      isListOpen: true
    }
  },
  methods: {
    selectCategory (category) {
      this.$emit('select-category', category)
    },
    openList () {
      this.isListOpen = !this.isListOpen
    }
  }
}
</script>

<style lang="scss">
.categories {
  flex: 0 0 auto;
  // .categories__title

  &__title {
    font-size: 14px;
    font-weight: 700;
    position: relative;
    margin-bottom: 15px;
    cursor: pointer;
    & span {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  // .categories__list

  &__list {
    & form {
      display: flex;
      flex-direction: column;
      column-gap: 10px;
    }
  }

  // .categories__item

  &__item {
  }
}
</style>
