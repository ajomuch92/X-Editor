<template>
    <div class="text-area">
        <textarea class="textarea is-small" type="text" :placeholder="placeholder"></textarea>
    </div>
</template>

<script>

export default {
    name: 'TextArea',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        language: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
    .text-area{
        margin: 5px;
    }
    .textarea{
        margin: 0px;
        width: 99%;
        height: 500px;
        padding: 5px;
        resize: none;
        border-radius: 3px;
    }
</style>
