<template>
    <div class="swiper-slide" :style="'background-image: url(\''+image+'\')'">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SliderItem',
    props: {
        image: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: -webkit-fill-available;
    }
</style>

