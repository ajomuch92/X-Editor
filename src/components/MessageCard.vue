<template>
    <article :class="'message '+ type" v-if="isVisible">
        <div class="message-header">
            <p>{{title}}</p>
            <button class="delete" aria-label="delete" @click="closeCard()"></button>
        </div>
        <div class="message-body">
            <slot></slot>
        </div>
    </article>
</template>

<script>
export default {
    name: 'MessageCard',
    props: {
        type: {
            type: String
        }, 
        title: {
            type: String,
            default: 'My title here'
        }
    },
    data(){
        return{
            isVisible: true
        }
    },
    methods:{
        closeCard(){
            this.isVisible = false;
        }
    }
}
</script>

<style>
    .message{
        margin: 5px;
    }
</style>
