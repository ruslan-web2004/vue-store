<template>
  <div class="main-layout">
    <the-header />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
export default {
    components: {
        TheHeader
    }
}
</script>

<style>

</style>