<template>
  <the-header />
  <main class="main">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>
<style lang="scss">
.main {
  flex: 1 1 auto;
}

// Animation

.page-enter-from,
.page-leave-t0 {
  opacity: 0;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
