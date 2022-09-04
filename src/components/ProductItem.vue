<template>
  <div class="product-item">
    <product-item-preview
      class="product-item__preview"
      :product="product"
      @open-popup="isPopupOpen = true"
    />
    <product-item-popup
      v-if="isPopupOpen"
      :productId="product.id"
      @close="isPopupOpen = false"
    />
  </div>
</template>

<script>
import ProductItemPreview from './ProductItemPreview.vue'
import ProductItemPopup from './ProductItemPopup.vue'
export default {
  components: {
    ProductItemPreview,
    ProductItemPopup
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: {}
    }
  },
  data () {
    return {
      isPopupOpen: false
    }
  },
  watch: {
    isPopupOpen (val) {
      val
        ? (document.documentElement.style.overflow = 'hidden')
        : (document.documentElement.style.overflow = 'auto')
    }
  }
}
</script>

<style lang="scss">
.product-item {
  // .product-item__preview
  &__preview {
    width: 100%;
  }
}
</style>
