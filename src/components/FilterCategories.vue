<template>
  <div class="categories">
    <div class="categories__title" :class="{ active: isListOpen }" @click="openList">
      <p>Категории</p>
    </div>
    <transition name="list">
      <form class="categories__list" v-if="isListOpen">
        <filter-categories-item
          class="categories__item"
          v-for="category in categoryItems"
          :key="category.value"
          :category="category"
          @select-category="selectCategory(category)"
          :selectedCategory="selectedCategory"
        />
      </form>
    </transition>
  </div>
</template>

<script>
import FilterCategoriesItem from './FilterCategoriesItem.vue'
import gsap from 'gsap'
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
    position: relative;
    &::before, &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 2px;
      background-color: black;
      top: 9px;
      right: 0;
    }
    &::after {
      transform: rotate(-90deg);
      transition: all 0.3s ease-in;
    }
    &.active {
      &::after {
        transform: rotate(0);
      }
    }
  }

  // .categories__list

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  // .categories__item

  &__item {
  }
}

// Animation
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
