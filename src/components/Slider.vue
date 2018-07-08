<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <slot name="content"></slot>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev" @click="movePrev"></div>
        <div class="swiper-button-next" @click="moveNext"></div>
        <div class="swiper-scrollbar"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'slider',
  props:{
    autoplay: {
      type: Boolean,
      default: false
    },
    delayTime: {
      type: Number,
      default: 2500
    },
    isPaginable: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      swiper: undefined
    }
  },
  mounted(){
    var config = {
      speed: 400,
      spaceBetween: 100,
      loop: true
    };
    if(this.autoplay){
      config.autoplay = {
        delay: this.delayTime,
        disableOnInteraction: false
      }
    }
    if(this.isPaginable){
      config.pagination = {
        el: '.swiper-pagination',
        clickable: true,
      };
    }
    this.swiper = new Swiper('.swiper-container', config);
  },
  methods:{
    moveNext(){
      this.swiper.slideNext();
    },
    movePrev(){
      this.swiper.slidePrev();
    }
  }
    
}
</script>

<style scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
