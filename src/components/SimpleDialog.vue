<template>
  <div class="modal__container">
    <div class="modal__body">
      <span class="modal__close" @click="cancel">🗙</span>
      <h1 class="modal__title">{{ title }}</h1>
      <div class="modal__question">{{ question }}</div>
      <div class="modal__action">
        <button class="modal__button modal__button--confirm" @click="confirm">
          Ок
        </button>
        <button class="modal__button modal__button--cancel" @click="cancel">
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { animationEnter, animationLeave } from '../animations/modal'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  question: {
    type: String,
    default: ''
  }
})
const emit = defineEmits({
  confirm: null,
  cancel: null
})

const confirm = () => {
  animationLeave('.modal__container', '.modal__body')
  setTimeout(() => emit('confirm'), 500)
}
const cancel = () => {
  animationLeave('.modal__container', '.modal__body')
  setTimeout(() => emit('cancel'), 500)
}

onMounted(() => {
  animationEnter('.modal__container', '.modal__body')
})
</script>
<style lang="scss">
.modal {
  // .modal__container

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #cececeb5;
  }

  // .modal__body

  &__body {
    background-color: #fff;
    border-radius: 15px;
    text-align: center;
    padding: 20px 40px;
    width: 400px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 992px) {
      width: 300px;
    }
  }

  // .modal__close

  &__close {
    cursor: pointer;
    position: relative;
    align-self: end;
    right: -33px;
    top: -17px;
  }

  // .modal__title

  &__title {
    border-bottom: 1px solid #d7dcdf;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    padding: 11px 0;
  }

  // modal__question

  &__question {
    max-width: 400px;
    line-height: 1.43em;
    padding: 24px 0 32px;
    @media screen and (max-width: 992px) {
      padding: 12px 0;
      font-size: 14px;
    }
  }

  // .modal__action

  &__action {
    display: flex;
    justify-content: space-between;
  }

  // .modal__button

  &__button {
    border: none;
    min-height: 32px;
    min-width: 96px;
    color: white;
    font-weight: 500;
    border-radius: 8px;
    padding: 0 12px;
    cursor: pointer;
    &--confirm {
      background-color: #005bff;
    }
    &--cancel {
      background-color: #10c44c;
    }
  }
}
</style>
