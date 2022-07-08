<template>
  <div class="popup" @click="close">
    <div class="popup__body">
      <div class="popup__content" @click.stop>
        <button class="popup__close" @click="close">
          <img src="../assets/icons/close.svg" alt="">
        </button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: {
    "close": null
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

  // .popup__body

  &__body {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
  }

  // .popup__content

  &__content {
    position: relative;
    background-color: white;
    padding: 30px;
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
}
</style>
