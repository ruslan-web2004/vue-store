<template>
  <div class="categories">
    <div class="categories__title" @click="openList">
      <p>Категории</p>
      <img v-if="!isListOpen" src="../assets/icons/plus.svg" />
      <img v-else src="../assets/icons/minus.svg" />
    </div>
    <transition name="list">
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
    </transition>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 15px;
    cursor: pointer;
    & img {
      width: 15px;
      height: 15px;
    }
  }

  // .categories__list

  &__list {
    & form {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
  }

  // .categories__item

  &__item {
  }
}

// Animation
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
