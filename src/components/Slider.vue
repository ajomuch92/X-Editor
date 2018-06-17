<template>
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide" v-for="(slide,key) in slides" :key="key">
                <img :src="slide">
            </div>
            ...
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev" @click="movePrev"></div>
        <div class="swiper-button-next" @click="moveNext"></div>

        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: 'slider',
    props:{
        slides:{
            type: Array,
            default: ()=>{}
        }
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
    
</style>
