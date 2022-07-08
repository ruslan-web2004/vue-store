<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <the-logo />
        <div class="header__buttons">
          <wish-button/>
          <cart-button />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TheLogo from './TheLogo.vue'
import WishButton from './WishButton.vue'
import CartButton from './CartButton.vue'
export default {
  components: {
    TheLogo,
    WishButton,
    CartButton
  }
}
</script>

<style lang="scss">
.header {
  margin-bottom: 32px;
  // .header__inner

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__buttons {
    display: flex;
    gap: 15px;
    align-items: center;
  }
}
</style>
