<template>
    <div class="control">
        <label :for="name" class="label">{{label}}</label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'RadioButton',
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>

</style>

