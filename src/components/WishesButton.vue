<template>
  <router-link :to="{ name: 'wishes' }" class="wishes-button">
    <img class="wishes-button__icon" src="../assets/icons/wish.svg" alt="" />
    <div class="wishes-button__count" v-if="count > 0">
      <span>{{ count }}</span>
    </div>
  </router-link>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      count: state => state.wishes.wishes.length
    })
  }
}
</script>

<style lang="scss">
.wishes-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 40px;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  // .wishes-button__icon

  &__icon {
    width: 30px;
  }
}
</style>
