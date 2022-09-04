<template>
  <label class="category">
    <input
      class="category__input"
      @change="$emit('select-category')"
      :checked="category.value === selectedCategory.value"
      type="radio"
      name="category"
    />
    <span class="category__label">{{ category.title }}</span>
  </label>
</template>
<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
      default: {}
    },
    selectedCategory: {
      type: Object,
      required: true,
      default: ''
    }
  },
  emits: {
    'select-category': null
  },
  data () {
    return {
      checked: null
    }
  }
}
</script>

<style lang="scss">
.category {
  cursor: pointer;

  // .category__input

  &__input {
    display: none;
    &:checked + .category__label {
      background-color: #d6d6e5;
    }
    &:checked + .category__label:before {
      box-shadow: inset 0 0 0 6px black;
    }
  }

  // .category__label

  &__label {
    display: inline-flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 31px;
    transition: 0.25 ease;
    &:hover {
      background-color: #d6d6e5;
    }
    &::before {
      content: '';
      background-color: white;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-right: 10px;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 2px black;
    }
    @media screen and (max-width: 850px) {
      font-size: 14px;
    }
    @media screen and (max-width: 500px) {
      font-size: 12px;
    }
  }
}
</style>
