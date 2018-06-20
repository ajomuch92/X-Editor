<template>
    <div class="select" :class="{'is-multiple': isMultiple, 'is-danger': isError}">
        <select :multiple="isMultiple" @change="$emit('select-change', $event.target.value)">
            <option :value="undefined">{{label}}</option>
            <option v-for="(option,key) in options" :key="key" :value="option.value">{{option.label}}</option>
        </select>
        <p class="help is-danger" v-if="isError">{{messageError}}</p>
    </div>
</template>

<script>
export default {
    name: 'InputSelect',
    model: {
        prop: 'value',
        event: 'select-change'
    },
    props: {
        label: {
            type: String,
            default: '-'
        },
        options: {
            type: Array,
            default: ()=>[]
        },
        isMultiple: {
            type: Boolean,
            default: false
        },
        value:{
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

