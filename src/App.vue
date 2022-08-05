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

body {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  background-color: #eff3f6;
  overflow-x: hidden;
}

.container {
  max-width: 1230px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
