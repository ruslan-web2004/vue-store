<template>
  <div class="pagination">
    <div class="pagination__items">
      <pagination-item
        v-for="page in totalPages"
        :key="page"
        :page="page"
        :selectedPage="selectedPage"
        @select-page="$emit('select-page', page)"
      />
    </div>
  </div>
</template>

<script>
import PaginationItem from './PaginationItem.vue'
export default {
  components: {
    PaginationItem
  },
  props: {
    selectedPage: {
      type: [Number, String],
      required: true,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1
    }
  },
  emits: {
    "select-page": value => typeof value === "number" || typeof value === "string"
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;

  // .pagination__items

  &__items {
    display: flex;
    gap: 10px;
  }
}
</style>
