<template>
    <div class="my-tabs">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Tabs',

}
</script>

<style scoped>
    .my-tabs {
        position: relative;   
        min-height: 200px;
        clear: both;
        margin: 25px 10px 25px 10px;
    }
</style>
