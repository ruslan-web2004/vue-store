<template>
  <section class="products">
    <div class="container">
      <div class="products__inner">
        <div class="products__left">
          <the-filter
            class="products__filter"
            @select-category="selectCategory"
            :category="category"
          />
        </div>
        <div class="products__right">
          <transition name="fade" mode="out-in">
            <div v-if="isLoading" class="products__loading">
              <loading v-model:active="isLoading" :is-full-page="false" />
            </div>
            <div v-else class="products__content">
              <div class="products__items">
                <product-item
                  class="products__item"
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                />
              </div>
              <div
                v-if="!products.length"
                class="products__empty"
              >
                Ничего не найдено
              </div>
              <div class="products__pagination">
                <paginate
                  v-model="page"
                  :page-count="totalPages"
                  :page-range="3"
                  :margin-pages="2"
                  :clickHandler="selectPage"
                  :prev-class="'pagination__button'"
                  :prev-link-class="'pagination__prev'"
                  :next-class="'pagination__button'"
                  :next-link-class="'pagination__next'"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'pagination__item'"
                  :page-link-class="'pagination__link'"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ProductItem from './ProductItem.vue'
import TheFilter from './TheFilter.vue'
import Paginate from 'vuejs-paginate/src/components/Paginate.vue'
import Loading from 'vue-loading-overlay'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  components: {
    ProductItem,
    TheFilter,
    Paginate,
    Loading
  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts'
    }),
    selectCategory (category) {
      this.$store.commit('products/setCategory', category)
    },
    selectPage (page) {
      this.$store.commit('products/setPage', page)
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
      isLoading: state => state.products.isLoading,
      category: state => state.products.category,
      page: state => state.products.page
    }),
    ...mapGetters({
      totalPages: 'products/getTotalPages'
    }),
    pageStateOptions () {
      return {
        category: this.category,
        page: this.page
      }
    }
  },
  watch: {
    category () {
      this.$store.commit('products/setPage', 1)
    },
    pageStateOptions () {
      this.fetchProducts()
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
<style lang="scss">
.products {
  // .products__inner

  &__inner {
    display: flex;
    gap: 20px;
    @media screen and (max-width: 850px) {
      gap: 15px;
    }
    @media screen and (max-width: 600px) {
      gap: 10px;
    }
  }

  // .products__left

  &__left {
    flex: 0 0 200px;
    @media screen and (max-width: 1050px) {
      flex: 0 0 170px;
    }
    @media screen and (max-width: 500px) {
      flex: 0 0 120px;
    }
  }

  // .products__filter

  &__filter {
    width: 100%;
  }

  // .products__right

  &__right {
    flex-grow: 1;
  }

  // .products__loading

  &__loading {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // .products__items

  &__items {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  // .products__item

  &__item {
    flex: 0 0 25%;
    @media screen and (max-width: 1050px) {
      flex: 0 0 33.33%;
    }
    @media screen and (max-width: 850px) {
      flex: 0 0 50%;
    }
    @media screen and (max-width: 600px) {
      flex: 0 0 100%;
    }
  }

  // .products__empty

  &__empty {
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    padding: 100px 0;
  }

  // .products__pagination

  &__pagination {
    display: flex;
    justify-content: center;
  }
}

.pagination {
  display: flex;
  column-gap: 15px;
  list-style-type: none;

  // .pagination__item

  &__item {
    &.disabled {
      .pagination__link {
        cursor: default;
        &:hover {
          background-color: transparent;
        }
      }
    }
    &.active {
      .pagination__link {
        background-color: black;
        color: white;
      }
    }
  }

  // .pagination__link

  &__link {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
      background-color: lightgrey;
    }
  }

  // .pagination__button

  &__button {
    &.disabled {
      opacity: 0.3;
      & a {
        cursor: default;
      }
    }
  }

  // .pagination__prev, .pagination__next

  &__prev, &__next {
    & img {
      width: 20px;
    }
  }

  // .pagination__prev

  &__prev {
    img {
      transform: rotate(180deg);
    }
  }
}

// Animation

.popup-enter-active,
.popup-leave-active {
  transition: all 0.5s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.products-enter-active,
.products-leave-active {
  transition: all 0.5s ease;
}

.products-enter-from,
.products-leave-to {
  opacity: 0;
}
</style>
