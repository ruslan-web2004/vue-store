<template>
  <div class="popup" @click="close">
    <div v-if="isLoading" class="popup__loading">
      <loading v-model:active="isLoading" :is-full-page="true" :color="'#fff'" />
    </div>
    <div v-else class="popup__body" @click.stop>
      <button class="popup__close" @click="close">
        <img src="../assets/icons/close.svg" alt="" />
      </button>
      <div class="popup__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
export default {
  components: {
    Loading
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  emits: {
    close: null
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  // .popup__loading

  &__loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // .popup__body

  &__body {
    position: relative;
    background-color: white;
    border-radius: 15px;
  }

  // .popup__close

  &__close {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  // .popup__content

  &__content {
    margin: 30px 0;
    padding: 0 30px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
      height: 30%;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(224, 224, 224, 1);
    }
    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: rgba(247, 248, 250, 1);
    }
  }
}
</style>
