<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <the-logo />
        <div class="header__buttons">
          <wish-button />
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
  background-color: white;
  border-bottom: 1px solid black;
  margin-bottom: 32px;
  padding: 15px 0;
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
