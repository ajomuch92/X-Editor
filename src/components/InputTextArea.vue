<template>
    <div class="text-area">
        <textarea class="textarea" :class="{'is-danger': isError}" :placeholder="placeholder" :rows="rows" @keypress="$emit('text-area-change',$event.target.value)" @change="$emit('text-area-change',$event.target.value)"></textarea>
        <p class="help is-danger" v-if="isError">{{messageError}}</p>
    </div>
</template>

<script>
export default {
    name: 'InputTextArea',
    model: {
        prop: 'value',
        event: 'text-area-change'
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        rows: {
            type: Number,
            default: 10
        },
        value: {
            type: String,
            default: ''
        },
        isError: {
            type: Boolean,
            default: false
        },
        messageError: {
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
</style>
