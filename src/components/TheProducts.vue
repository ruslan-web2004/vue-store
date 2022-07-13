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
          <div class="products__items">
            <product-item
              v-for="product in products"
              :key="product.id"
              :product="product"
              @open-popup="openPopup(product.id)"
            />
          </div>
          <the-pagination
            :selectedPage="selectedPage"
            :totalPages="totalPages"
            @select-page="selectPage"
          />
          <product-popup
            v-if="isPopupOpen"
            :popupProductId="popupProductId"
            @close="closePopup"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductItem from './ProductItem.vue'
import ProductPopup from './ProductPopup.vue'
import TheFilter from './TheFilter.vue'
import ThePagination from './ThePagination.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    ProductItem,
    ProductPopup,
    TheFilter,
    ThePagination
  },
  data () {
    return {
      selectedPage: 1,
      selectedCategory: '',
      totalPages: 3,
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
      products: 'products/getProducts'
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
    if (this.$route.query.category && this.$route.query.page) {
      this.selectedCategory = this.$route.query.category
      this.selectedPage = this.$route.query.page
    }
    
    if (Object.keys(this.$route.query).length === 0) {
      this.fetchProducts()
    }
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

  // .products__items

  &__items {
    display: grid;
    grid-template-columns: repeat(3, 300px);
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }
}
</style>
