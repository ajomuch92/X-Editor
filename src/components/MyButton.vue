<template>
    <button :class="getClasses" @click="onClick()"><slot></slot></button>
</template>

<script>
export default {
    name: 'MyButton',
    props: {
        name: {
            type: String,
            default: 'My-button'
        },
        type: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        diplay: {
            type: String,
            default: ''
        },
        isOutlined: {
            type: Boolean,
            default: false
        },
        isInverted: {
            type: Boolean,
            default: false
        },
        isRounded: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        isDisable: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        getClasses: function(){
            let classes = 'button ' + this.type + ' ' + this.size + ' ' + this.diplay;
            classes += this.isOutlined? ' is-outlined': '';
            classes += this.isInverted? ' is-inverted': '';
            classes += this.isRounded? ' is-rounded': '';
            classes += this.isLoading? ' is-loading': '';
            return classes;
        }
    },
    methods: {
        onClick(){
            this.$emit('click', this.name);
        }
    }
}
</script>

<style>

</style>
