<template>
    <div :class="'notification '+type">
        <button class="delete" @click="close()"></button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        name: {
            type: String,
            default: 'is-primary'
        },
        type: {
            type: String,
            default: 'is-primary'
        }
    },
    methods:{
        close(){
            this.$emit('close-notification', this.name);
        }
    }
}
</script>

<style scoped>
    .notification {
        margin: 5px;
    }
</style>
