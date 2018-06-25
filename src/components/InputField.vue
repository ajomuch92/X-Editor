<template>
    <div class="field">
        <label class="label" v-if="label!=''">{{label}}</label>
        <div class="control" :class="{'has-icons-left': icon!=''}">
            <input class="input" :class="{'is-danger': isError}" :type="type" :placeholder="placeholder" @keypress="valueChanged($event)" @change="valueChanged($event)">
            <span class="icon is-small is-left" v-if="icon!=''">
                <i :class="icon"></i>
            </span>
        </div>
        <p class="help is-danger" v-if="isError">{{messageError}}</p>
    </div>
</template>

<script>
export default {
    name: 'InputField',
    model: {
        prop: 'value',
        event: 'text-change'
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        icon: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        initialValue: {
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
        },
        value: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            currentValue: ''
        }
    },
    methods :{
        valueChanged(event){
            this.$emit('text-change', event.target.value);
        }
    }
}
</script>

<style scoped>
    .field{
        margin: 5px;
    }
</style>