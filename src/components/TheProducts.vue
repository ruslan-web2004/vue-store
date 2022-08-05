<template>
  <div class="products">
    <div class="container">
      <div class="products__inner">
        <div class="products__left">
          <the-filter
            class="products__filter"
            @select-category="selectCategory"
            :selectedCategory="selectedCategory"
          />
        </div>
        <div class="products__right">
          <transition name="products" mode="out-in">
            <div v-if="isLoading" class="products__loading">
              <loading v-model:active="isLoading" :is-full-page="false" />
            </div>
            <div v-else class="products__content">
              <div class="products__items">
                <product-item
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  @open-popup="openPopup(product.id)"
                />
              </div>
              <div
                v-if="products.length == 0 && !isLoading"
                class="products__empty"
              >
                Ничего не найдено
              </div>
              <div class="products__pagination">
                <paginate
                  v-model="selectedPage"
                  :value="Number(selectedPage)"
                  :page-count="totalPages"
                  :page-range="3"
                  :margin-pages="2"
                  :click-handler="selectPage"
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
        <transition name="popup">
          <product-popup
            v-if="isPopupOpen"
            :popupProductId="Number(popupProductId)"
            @close="closePopup"
          />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import ProductItem from './ProductItem.vue'
import ProductPopup from './ProductPopup.vue'
import TheFilter from './TheFilter.vue'
import Paginate from 'vuejs-paginate/src/components/Paginate.vue'
import Loading from 'vue-loading-overlay'
import { mapGetters } from 'vuex'
export default {
  components: {
    ProductItem,
    ProductPopup,
    TheFilter,
    Paginate,
    Loading
  },
  data () {
    return {
      selectedPage: 1,
      selectedCategory: '',
      totalPages: 10,
      isPopupOpen: false,
      popupProductId: null
    }
  },
  methods: {
    selectCategory (category) {
      this.selectedCategory = category.value
    },
    selectPage (page) {
      this.selectedPage = page
    },
    fetchProducts () {
      this.$store.dispatch('products/fetchProducts', {
        page: this.selectedPage,
        category: this.selectedCategory
      })
    },
    openPopup (id) {
      this.isPopupOpen = true
      this.popupProductId = id
    },
    closePopup () {
      this.isPopupOpen = false
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/getProducts',
      isLoading: 'products/getIsLoading'
    }),
    pageStateOptions () {
      return {
        category: this.selectedCategory,
        page: this.selectedPage
      }
    }
  },
  watch: {
    selectedCategory () {
      this.selectedPage = 1
    },
    pageStateOptions (value) {
      if (value.category == '' && value.page == 1) {
        this.$router.push({ query: {} })
      } else {
        this.$router.push({
          query: { category: value.category, page: value.page }
        })
      }
    },
    async '$route.query' () {
      if (Object.keys(this.$route.query).length === 0) {
        this.selectedCategory = ''
        this.selectedPage = 1
      } else {
        this.selectedCategory = this.$route.query.category
        this.selectedPage = this.$route.query.page
      }
      this.fetchProducts()
    },
    isPopupOpen () {
      if (this.isPopupOpen) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  created () {
    if (Object.keys(this.$route.query).length) {
      this.selectedCategory = this.$route.query.category
      this.selectedPage = this.$route.query.page
    }
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
  }

  // .products__left

  &__left {
    flex: 0 0 200px;
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
    display: grid;
    grid-template-columns: repeat(3, 300px);
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
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
    &:hover {
      background-color: lightgrey;
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
