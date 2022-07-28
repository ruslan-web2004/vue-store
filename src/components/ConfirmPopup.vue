<template>
  <popup-overlay @close="confirm(false)">
    <div class="popup__title">{{ title }}</div>
    <div class="popup__text">
      <slot />
    </div>
    <div class="popup__buttons">
      <button class="popup__cancel" @click="confirm(false)">{{ cancelText || 'Отмена' }}</button>
      <button class="popup__ok" @click="confirm(true)">{{ okText || 'Ок' }}</button>
    </div>
  </popup-overlay>
</template>

<script>
import PopupOverlay from './PopupOverlay.vue'
export default {
  components: {
    PopupOverlay
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    cancelText: {
      type: String,
      required: false,
      default: ''
    },
    okText: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: {
    "confirm": null
  },
  methods: {
    confirm (bool) {
      this.$emit('confirm', bool)
    }
  }
}
</script>

<style lang="scss">
.popup {
  // .popup__title

  &__title {
    border-bottom: 1px solid #d7dcdf;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    padding: 11px 0;
  }

  // .popup__text

  &__text {
    max-width: 400px;
    line-height: 1.43em;
    padding: 24px 0 32px;
  }

  // .popup__buttons

  &__buttons {
    display: flex;
    justify-content: space-between;
    & button {
      border: none;
      min-height: 32px;
      min-width: 96px;
      color: white;
      font-weight: 500;
      border-radius: 8px;
      padding: 0 12px;
      cursor: pointer;
    }
  }

  // .popup__cancel

  &__cancel {
    background-color: #10c44c;
  }

  // .popup__ok

  &__ok {
    background-color: #005bff;
  }
}
</style>
