<template>
  <div class="product-slider">
    <div class="product-slider__thumbs">
      <button
        class="product-slider__thumbs-item"
        v-for="(item, index) in images"
        :key="item"
        :class="{active: index == this.initialSlide}"
        @click="setSlide(index)"
      >
        <img :src="images[index]" alt="" />
      </button>
    </div>
    <div class="product-slider__main">
      <swiper
        @swiper="onSwiper"
        @slide-change="onSlideChange"
        :modules="modules"
        :navigation="{
          nextEl: '.product-slider__main-next',
          prevEl: '.product-slider__main-prev'
        }"
      >
        <swiper-slide
          class="product-slider__main-item"
          v-for="(item, index) in images"
          :key="item"
        >
          <img :src="images[index]" alt="" />
        </swiper-slide>
      </swiper>
      <button class="product-slider__main-prev">
        <img src="../assets/icons/arrow.svg" alt="" />
      </button>
      <button class="product-slider__main-next">
        <img src="../assets/icons/arrow.svg" alt="" />
      </button>
    </div>
  </div>
</template>
<script>
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    images: {
      type: Array,
      required: true,
      default: []
    }
  },
  data () {
    return {
      modules: [Navigation],
      initialSlide: 0,
      swiper: null
    }
  },
  methods: {
    setSlide (index) {
      this.initialSlide = index
    },
    onSwiper (swiper) {
      this.swiper = swiper
    },
    onSlideChange (swiper) {
      this.initialSlide = swiper.activeIndex
    }
  },
  watch: {
    initialSlide () {
      this.swiper.slideTo(this.initialSlide, 1, false)
    }
  }
}
</script>
<style lang="scss">
.product-slider {
  // .product-slider
  display: flex;
  gap: 10px;

  // .product-slider__thumbs

  &__thumbs {
    flex: 0 0 80px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    @media screen and (max-width: 540px) {
      flex: 0 0 70px;
    }
  }

  // .product-slider__thumbs-item

  &__thumbs-item {
    border: 1px solid transparent;
    background-color: transparent;
    width: 100%;
    position: relative;
    padding-bottom: 133%;
    & img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

    }
    &.active {
      border: 1px solid black;
    }
  }

  // .product-slider__main

  &__main {
    min-width: 0;
    position: relative;
    &:hover {
      & .product-slider__main-prev,
      .product-slider__main-next {
        display: block;
      }
    }
  }

  // .product-slider__main-item

  &__main-item {
    width: 100%;
    & img {
      width: 100%;
    }
  }

  // .product-slider__main-prev .product-slider__main-next

  &__main-prev,
  &__main-next {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    z-index: 10;
    cursor: pointer;
    display: none;
    & img {
      width: 15px;
    }
    &:disabled {
      opacity: 0.5;
    }
  }

  // .product-slider__main-prev

  &__main-prev {
    left: 10px;
    & img {
      transform: rotate(-90deg);
    }
  }

  // .product-slider__main-next

  &__main-next {
    right: 10px;
    & img {
      transform: rotate(90deg);
    }
  }
}
</style>
