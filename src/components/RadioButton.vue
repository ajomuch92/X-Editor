<template>
    <div class="control">
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
        }
    }
}
</script>

<style scoped>

</style>

