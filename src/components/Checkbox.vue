<template>
    <label class="checkbox">
        <input type="checkbox" @change="checkboxChange()" v-model="currentValue">
        <slot></slot>
        <p class="help is-danger" v-if="isError">{{messageError}}</p>
    </label>
</template>

<script>
export default {
    name: 'Checkbox',
    model: {
        prop: 'value',
        event: 'checkbox-change'
    },
    props: {
        value: {
            type: String
        },
        isError: {
            type: Boolean,
            default: false
        },
        messageError: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            currentValue: false
        }
    },
    methods:{
        checkboxChange(){
            this.$emit('checkbox-change', this.currentValue.toString());
        }
    }
}
</script>

<style scoped>
    .checkbox{
        margin-left: 5px;
    }
</style>
