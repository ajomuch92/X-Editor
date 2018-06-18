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
        
    },
    data(){
        return{
            swiper: undefined
        }
    },
    mounted(){
        this.swiper = new Swiper('.swiper-container', {
            speed: 400,
            spaceBetween: 100,
            loop: true
        });
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
