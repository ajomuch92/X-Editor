<template>
    <label class="radio">
        <input type="radio" :name="groupName" :value="value" @change="$emit('radio-button-change', value)" :disabled="isDisable">
        <slot></slot>
    </label>
</template>

<script>
export default {
    name: 'RadioOption',
    props: {
        groupName: {
            type: String,
            required: true
        },
        value: {
            type: undefined
        },
        isDisable: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>
