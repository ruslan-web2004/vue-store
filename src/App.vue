<template>
  <router-view />
  <dialogs-wrapper />
</template>
<script>
import MainLayout from './layouts/MainLayout.vue'
export default {
  components: {
    MainLayout
  }
}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  min-width: 420px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  background-color: #eff3f6;
  overflow-x: hidden;
}

#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1230px;
  padding: 0 15px;
  margin: 0 auto;
}
// Animation

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
